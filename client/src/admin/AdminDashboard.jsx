import { useEffect, useState } from "react";

function AdminDashboard() {
  const [fans, setFans] = useState([]);
  const [fanUnreadCounts, setFanUnreadCounts] = useState({});
  const [activeSection, setActiveSection] = useState("overview");
  const [loadingFans, setLoadingFans] = useState(true);
  const [fansError, setFansError] = useState("");
  const [inboxFans, setInboxFans] = useState([]);
  const [loadingInboxFans, setLoadingInboxFans] = useState(false);
  const [membershipChanges, setMembershipChanges] = useState({});
  const [membershipMessage, setMembershipMessage] = useState("");
  const [inboxFansError, setInboxFansError] = useState("");
  const [aaronUnreadCount, setAaronUnreadCount] = useState(0);
  const [managementUnreadCount, setManagementUnreadCount] = useState(0);

  const [selectedFan, setSelectedFan] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState("");
  const [replyImageName, setReplyImageName] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [replySuccess, setReplySuccess] = useState("");

  const navigationItems = [
    { id: "overview", label: "Overview" },
    { id: "aaronInbox", label: "Aaron's Inbox" },
    { id: "managementInbox", label: "Management Inbox" },
    { id: "fans", label: "Fan Accounts" },
    { id: "memberships", label: "Memberships" },
    { id: "gallery", label: "Gallery Management" },
    { id: "settings", label: "Settings" },
  ];

  const sectionTitles = {
    overview: "Dashboard Overview",
    aaronInbox: "Aaron's Inbox",
    managementInbox: "Management Inbox",
    fans: "Fan Accounts",
    memberships: "Membership Management",
    gallery: "Gallery Management",
    settings: "Administration Settings",
  };

  function getCurrentRecipient() {
    return activeSection === "managementInbox" ? "management" : "aaron";
  }

  async function getAdminResponse(url, options = {}) {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    const responseText = await response.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (error) {
      throw new Error(
        `Server returned a non-JSON response. Status: ${response.status}. Response: ${responseText.slice(0, 200)}`,
      );
    }

    if (!response.ok) {
      throw new Error(data.message || "The request could not be completed.");
    }

    return data;
  }

  async function fetchUnreadCounts() {
    try {
      const data = await getAdminResponse(
        "https://aaron-pierre-backend.vercel.app/api/admin/messages/unread-counts",
      );

      setAaronUnreadCount(data.counts.aaron);
      setManagementUnreadCount(data.counts.management);

      const unreadCountsByFan = {};

      (data.fanCounts || []).forEach(function (item) {
        unreadCountsByFan[String(item.fanId)] = item.count;
      });

      console.log("Unread counts by fan:", unreadCountsByFan);

      setFanUnreadCounts(function (previousCounts) {
        return {
          ...previousCounts,
          ...unreadCountsByFan,
        };
      });
    } catch (error) {
      console.error("Failed to fetch unread message counts:", error.message);
    }
  }
  async function updateFanMembership(fanId, membershipTier) {
    try {
      setMembershipMessage("");

      const data = await getAdminResponse(
        `https://aaron-pierre-backend.vercel.app/api/admin/fans/${fanId}/membership`,
        {
          method: "PATCH",
          body: JSON.stringify({
            membershipTier: membershipTier,
          }),
        },
      );

      setFans(function (currentFans) {
        return currentFans.map(function (fan) {
          if ((fan.id || fan._id) === fanId) {
            return {
              ...fan,
              membershipTier: data.fan.membershipTier,
            };
          }

          return fan;
        });
      });

      setMembershipChanges(function (currentChanges) {
        const updatedChanges = { ...currentChanges };
        delete updatedChanges[fanId];
        return updatedChanges;
      });

      setMembershipMessage(data.message || "Membership updated successfully.");
    } catch (error) {
      setMembershipMessage(error.message || "Failed to update membership.");
    }
  }
  async function fetchInboxFans(recipient) {
    const inboxFans = await Promise.all(
      fans.map(async function (fan) {
        try {
          const fanId = fan.id || fan._id;

          const data = await getAdminResponse(
            `https://aaron-pierre-backend.vercel.app/api/admin/messages/${fanId}?recipient=${recipient}`,
          );

          if (Array.isArray(data.messages) && data.messages.length > 0) {
            return fan;
          }

          return null;
        } catch (error) {
          console.error("Unable to check fan conversation:", error);
          return null;
        }
      }),
    );

    return inboxFans.filter(function (fan) {
      return fan !== null;
    });
  }

  useEffect(() => {
    async function fetchFans() {
      try {
        setFansError("");

        const data = await getAdminResponse(
          "https://aaron-pierre-backend.vercel.app/api/admin/fans",
        );

        const fanList = Array.isArray(data)
          ? data
          : Array.isArray(data.fans)
            ? data.fans
            : [];

        setFans(fanList);
      } catch (error) {
        setFansError(error.message || "Unable to load registered fans.");
      } finally {
        setLoadingFans(false);
      }
    }

    fetchFans();
    fetchUnreadCounts();

    const unreadInterval = setInterval(() => {
      fetchUnreadCounts();
    }, 5000);

    return () => {
      clearInterval(unreadInterval);
    };
  }, []);

  function openSection(section) {
    setActiveSection(section);
    setSelectedFan(null);
    setMessages([]);
    setMessagesError("");
    setReplyError("");
    setReplySuccess("");
    setReplyText("");
    setReplyImage("");
    setReplyImageName("");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (section === "aaronInbox" || section === "managementInbox") {
      const recipient = section === "managementInbox" ? "management" : "aaron";

      setLoadingInboxFans(true);
      setInboxFansError("");

      fetchInboxFans(recipient)
        .then(function (filteredFans) {
          setInboxFans(filteredFans);
        })
        .catch(function (error) {
          setInboxFansError(
            error.message || "Unable to load inbox conversations.",
          );
        })
        .finally(function () {
          setLoadingInboxFans(false);
        });
    } else {
      setInboxFans([]);
    }
  }
  async function openConversation(fan) {
    setSelectedFan(fan);
    setMessages([]);
    setMessagesError("");
    setReplyError("");
    setReplySuccess("");
    setReplyText("");
    setReplyImage("");
    setReplyImageName("");
    setLoadingMessages(true);

    try {
      const recipient = getCurrentRecipient();
      const fanId = fan.id || fan._id;
      setFanUnreadCounts((previousCounts) => ({
        ...previousCounts,
        [String(fanId)]: 0,
      }));

      const data = await getAdminResponse(
        `https://aaron-pierre-backend.vercel.app/api/admin/messages/${fanId}?recipient=${recipient}`,
      );

      setSelectedFan(data.fan || fan);
      setMessages(Array.isArray(data.messages) ? data.messages : []);
      await fetchUnreadCounts();
    } catch (error) {
      setMessagesError(error.message || "Unable to load this conversation.");
    } finally {
      setLoadingMessages(false);
    }
  }

  async function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setReplyError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setReplyError("Please select an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      const reader = new FileReader();

      reader.onload = function () {
        setReplyImage(reader.result);
        setReplyImageName(file.name);
        setReplyError("");
      };

      reader.onerror = function () {
        setReplyError("Unable to read this image.");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setReplyError("Unable to load the selected image.");
    }
  }

  async function sendReply(event) {
    event.preventDefault();

    if (!selectedFan) {
      setReplyError("Please select a fan conversation first.");
      return;
    }

    if (!replyText.trim() && !replyImage) {
      setReplyError("Please enter a message or attach an image.");
      return;
    }

    setSendingReply(true);
    setReplyError("");
    setReplySuccess("");

    try {
      const fanId = selectedFan.id || selectedFan._id;
      const recipient = getCurrentRecipient();

      const data = await getAdminResponse(
        `https://aaron-pierre-backend.vercel.app/api/admin/messages/${fanId}?recipient=${recipient}`,
        {
          method: "POST",
          body: JSON.stringify({
            sender: recipient,
            text: replyText,
            image: replyImage,
            imageName: replyImageName,
          }),
        },
      );

      if (data.data) {
        setMessages(function (previousMessages) {
          return [...previousMessages, data.data];
        });
      } else {
        await openConversation(selectedFan);
      }

      setReplyText("");
      setReplyImage("");
      setReplyImageName("");
      setReplySuccess("Reply sent successfully!");
    } catch (error) {
      setReplyError(error.message || "Unable to send this reply.");
    } finally {
      setSendingReply(false);
    }
  }

  function renderComingSoon(title, description) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#12192B] p-8 sm:p-10">
        <div className="flex h-14 w-14 items-center justify-center border border-[#C5A46D]/30 bg-[#C5A46D]/10 text-2xl text-[#D8BD8A]">
          AP
        </div>

        <h3 className="mt-6 text-xl font-semibold">{title}</h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-xs text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          Backend connection pending
        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          This section is ready for its management interface. Its real data and
          actions still need to be connected to the backend.
        </p>

        <button
          type="button"
          onClick={() => openSection("overview")}
          className="mt-6 border border-white/10 px-5 py-3 text-xs text-slate-300 transition hover:border-[#C5A46D] hover:text-[#D8BD8A]"
        >
          Back to Overview
        </button>
      </div>
    );
  }

  function renderOverview() {
    return (
      <>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() => openSection("fans")}
            className="rounded-2xl border border-white/10 bg-[#12192B] p-6 text-left transition hover:border-[#C5A46D]/50"
          >
            <p className="text-sm text-slate-400">Registered Fans</p>

            <h3 className="mt-4 text-3xl font-semibold">
              {loadingFans ? "..." : fansError ? "!" : fans.length}
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              {loadingFans
                ? "Loading registered fans..."
                : fansError
                  ? fansError
                  : "View registered fan accounts"}
            </p>
          </button>

          <button
            type="button"
            onClick={() => openSection("aaronInbox")}
            className="rounded-2xl border border-white/10 bg-[#12192B] p-6 text-left transition hover:border-[#C5A46D]/50"
          >
            <p className="text-sm text-slate-400">Aaron's Inbox</p>

            <h3 className="mt-4 text-3xl font-semibold">{aaronUnreadCount}</h3>

            <p className="mt-2 text-xs text-slate-500">
              Unread messages from fans
            </p>
          </button>

          <button
            type="button"
            onClick={() => openSection("managementInbox")}
            className="rounded-2xl border border-white/10 bg-[#12192B] p-6 text-left transition hover:border-[#C5A46D]/50"
          >
            <p className="text-sm text-slate-400">Management Inbox</p>

            <h3 className="mt-4 text-3xl font-semibold">
              {managementUnreadCount}
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Unread management messages
            </p>
          </button>
          <button
            type="button"
            onClick={() => openSection("gallery")}
            className="rounded-2xl border border-white/10 bg-[#12192B] p-6 text-left transition hover:border-[#C5A46D]/50"
          >
            <p className="text-sm text-slate-400">Gallery Images</p>

            <h3 className="mt-4 text-3xl font-semibold">—</h3>

            <p className="mt-2 text-xs text-slate-500">
              Open gallery management
            </p>
          </button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#12192B] p-6 xl:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Recent Activity</h3>

                <p className="mt-1 text-sm text-slate-400">
                  An overview of activity across your website.
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                Overview
              </span>
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-white/10 px-5 py-10 text-center">
              <p className="text-sm font-medium text-slate-300">
                Your activity overview will appear here.
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Activity tracking still needs to be connected to the database.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12192B] p-6">
            <h3 className="text-lg font-semibold">Quick Access</h3>

            <p className="mt-1 text-sm text-slate-400">
              Open your management tools.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => openSection("aaronInbox")}
                className="block w-full rounded-xl border border-white/10 px-4 py-4 text-left text-sm transition hover:border-[#C5A46D]/50 hover:bg-white/[0.03]"
              >
                <span className="font-medium">Aaron's Inbox</span>

                <span className="mt-1 block text-xs text-slate-500">
                  View and reply to Aaron's conversations
                </span>
              </button>

              <button
                type="button"
                onClick={() => openSection("managementInbox")}
                className="block w-full rounded-xl border border-white/10 px-4 py-4 text-left text-sm transition hover:border-[#C5A46D]/50 hover:bg-white/[0.03]"
              >
                <span className="font-medium">Management Inbox</span>

                <span className="mt-1 block text-xs text-slate-500">
                  Handle enquiries for management
                </span>
              </button>

              <button
                type="button"
                onClick={() => openSection("fans")}
                className="block w-full rounded-xl border border-white/10 px-4 py-4 text-left text-sm transition hover:border-[#C5A46D]/50 hover:bg-white/[0.03]"
              >
                <span className="font-medium">Fan Accounts</span>

                <span className="mt-1 block text-xs text-slate-500">
                  Manage registered fans
                </span>
              </button>

              <button
                type="button"
                onClick={() => openSection("memberships")}
                className="block w-full rounded-xl border border-white/10 bg-[#12192B] px-4 py-4 text-left text-sm transition hover:border-[#C5A46D]/50 hover:bg-white/[0.03]"
              >
                <span className="font-medium">Memberships</span>

                <span className="mt-1 block text-xs text-slate-500">
                  Review membership tiers
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#C5A46D]/20 bg-[#C5A46D]/5 p-6">
          <p className="text-sm font-medium text-[#D8BD8A]">
            Executive Control Room
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Your private workspace for managing fan conversations, accounts,
            memberships, and website media.
          </p>
        </div>
      </>
    );
  }

  function renderFanAccounts() {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#12192B] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold">Registered Fan Accounts</h3>

            <p className="mt-2 text-sm text-slate-400">
              Accounts retrieved from your backend.
            </p>
          </div>

          <span className="w-fit rounded-full border border-[#C5A46D]/30 px-4 py-2 text-xs text-[#D8BD8A]">
            {loadingFans ? "Loading..." : `${fans.length} registered`}
          </span>
        </div>

        {loadingFans ? (
          <p className="mt-8 text-sm text-slate-400">
            Loading registered fans...
          </p>
        ) : fansError ? (
          <p className="mt-8 text-sm text-red-300">{fansError}</p>
        ) : fans.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-400">
            No registered fan accounts were found.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-4 font-medium">Fan</th>
                  <th className="px-4 py-4 font-medium">Email</th>
                  <th className="px-4 py-4 font-medium">Membership</th>
                </tr>
              </thead>

              <tbody>
                {fans.map((fan, index) => (
                  <tr
                    key={fan._id || fan.id || index}
                    className="border-b border-white/5"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span>
                          {fan.displayName ||
                            fan.name ||
                            fan.username ||
                            "Unnamed fan"}
                        </span>

                        {(fanUnreadCounts[fan.id || fan._id] || 0) > 0 && (
                          <span
                            title={`${fanUnreadCounts[fan.id || fan._id]} unread messages sent to Aaron`}
                            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white"
                          >
                            {fanUnreadCounts[fan.id || fan._id] > 99
                              ? "99+"
                              : fanUnreadCounts[fan.id || fan._id]}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {fan.email || "No email provided"}
                    </td>

                    <td className="px-4 py-4 text-[#D8BD8A]">
                      {fan.membershipTier ||
                        fan.membership ||
                        fan.tier ||
                        "Fan"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs leading-6 text-slate-500">
          Account deletion and membership changes have not been enabled here.
          We'll connect those actions securely through the backend next.
        </p>
      </div>
    );
  }

  function renderFanMessages() {
    const recipient = getCurrentRecipient();
    const inboxName = recipient === "management" ? "Management" : "Aaron";

    return (
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12192B]">
          <div className="border-b border-white/10 p-5">
            <h3 className="text-lg font-semibold">Conversations</h3>

            <p className="mt-1 text-xs text-slate-400">
              Select a registered fan to view {inboxName.toLowerCase()}'s
              messages.
            </p>
          </div>

          {loadingInboxFans ? (
            <p className="p-5 text-sm text-slate-400">
              Loading conversations...
            </p>
          ) : inboxFansError ? (
            <p className="p-5 text-sm text-red-300">{inboxFansError}</p>
          ) : inboxFans.length === 0 ? (
            <p className="p-5 text-sm text-slate-400">
              No conversations found in {inboxName}'s inbox.
            </p>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
              {inboxFans.map(function (fan, index) {
                const fanId = String(fan._id || fan.id);
                const selectedId = selectedFan?.id || selectedFan?._id;

                return (
                  <button
                    key={fanId || index}
                    type="button"
                    onClick={() => openConversation(fan)}
                    className={`flex w-full items-center gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/[0.03] ${
                      selectedId === fanId ? "bg-[#C5A46D]/10" : ""
                    }`}
                  >
                    {fan.profilePicture ? (
                      <img
                        src={fan.profilePicture}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A46D]/30 bg-[#C5A46D]/10 text-sm font-semibold text-[#D8BD8A]">
                        {(fan.displayName || "F").charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {fan.displayName || "Unnamed fan"}
                        </p>

                        {(fanUnreadCounts[fanId] || 0) > 0 && (
                          <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                            {fanUnreadCounts[fanId] > 99
                              ? "99+"
                              : fanUnreadCounts[fanId]}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {fan.email}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-wider text-[#D8BD8A]">
                        {fan.membershipTier || "Fan"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12192B]">
          {!selectedFan ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-[#C5A46D]/30 bg-[#C5A46D]/10 text-2xl text-[#D8BD8A]">
                AP
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {inboxName}'s Private Inbox
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Select a fan from the conversation list to read their messages
                and send a reply.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-white/10 p-5">
                {selectedFan.profilePicture ? (
                  <img
                    src={selectedFan.profilePicture}
                    alt=""
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A46D]/30 bg-[#C5A46D]/10 font-semibold text-[#D8BD8A]">
                    {(selectedFan.displayName || "F").charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {selectedFan.displayName || "Unnamed fan"}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {selectedFan.email}
                  </p>
                </div>

                <span className="hidden rounded-full border border-emerald-400/20 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-300 sm:inline-block">
                  {inboxName} Inbox
                </span>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {loadingMessages ? (
                  <p className="py-10 text-center text-sm text-slate-400">
                    Loading conversation...
                  </p>
                ) : messagesError ? (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
                    <p className="text-sm text-red-300">{messagesError}</p>

                    <button
                      type="button"
                      onClick={() => openConversation(selectedFan)}
                      className="mt-3 text-xs text-[#D8BD8A] underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-slate-300">
                      No messages in this conversation yet.
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      You can send the first message below.
                    </p>
                  </div>
                ) : (
                  messages.map(function (message, index) {
                    const isFan = message.sender === "fan";

                    return (
                      <div
                        key={message.id || message._id || index}
                        className={`flex ${
                          isFan ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl border p-4 sm:max-w-[75%] ${
                            isFan
                              ? "border-white/10 bg-[#0B1020]"
                              : "border-[#C5A46D]/20 bg-[#C5A46D]/10"
                          }`}
                        >
                          <p className="mb-2 text-[10px] uppercase tracking-wider text-[#D8BD8A]">
                            {message.sender === "fan"
                              ? selectedFan.displayName || "Fan"
                              : message.sender === "management"
                                ? "Management"
                                : "Aaron"}
                          </p>

                          {message.text && (
                            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
                              {message.text}
                            </p>
                          )}

                          {message.image && (
                            <a
                              href={message.image}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 block"
                            >
                              <img
                                src={message.image}
                                alt={message.imageName || "Message attachment"}
                                className="max-h-72 rounded-lg border border-white/10 object-contain"
                              />

                              {message.imageName && (
                                <span className="mt-2 block text-xs text-slate-400">
                                  {message.imageName}
                                </span>
                              )}
                            </a>
                          )}

                          <p className="mt-3 text-right text-[10px] text-slate-500">
                            {message.time || message.createdAt
                              ? new Date(
                                  message.time || message.createdAt,
                                ).toLocaleString()
                              : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form
                onSubmit={sendReply}
                className="border-t border-white/10 p-4 sm:p-5"
              >
                {replyImage && (
                  <div className="mb-4 flex items-start gap-3 rounded-xl border border-white/10 p-3">
                    <img
                      src={replyImage}
                      alt="Selected attachment"
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="break-all text-xs text-slate-300">
                        {replyImageName}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setReplyImage("");
                          setReplyImageName("");
                        }}
                        className="mt-2 text-xs text-red-300 hover:text-red-200"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}

                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows={3}
                  placeholder={`Write your reply as ${inboxName}...`}
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#C5A46D]"
                />

                {replyError && (
                  <p className="mt-3 text-xs text-red-300">{replyError}</p>
                )}

                {replySuccess && (
                  <p className="mt-3 text-xs text-emerald-300">
                    {replySuccess}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <label className="cursor-pointer rounded-lg border border-white/10 px-4 py-3 text-xs text-slate-300 transition hover:border-[#C5A46D] hover:text-[#D8BD8A]">
                    Attach image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={sendingReply || loadingMessages}
                    className="rounded-lg bg-[#C5A46D] px-6 py-3 text-xs font-semibold text-[#0B1020] transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendingReply ? "Sending..." : "Send Reply"}
                  </button>
                </div>

                <p className="mt-4 text-[10px] leading-5 text-slate-500">
                  Replies are saved through your administrator API. Image
                  attachments are limited to 5 MB in this interface.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#0D1425] p-6 md:block">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-[#D8BD8A]">AP</h1>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">
            Executive Control Room
          </p>
        </div>
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openSection(item.id)}
              className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                activeSection === item.id
                  ? "bg-[#C5A46D]/10 font-medium text-[#D8BD8A]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span>{item.label}</span>

                {item.id === "aaronInbox" && aaronUnreadCount > 0 && (
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {aaronUnreadCount}
                  </span>
                )}

                {item.id === "managementInbox" && managementUnreadCount > 0 && (
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {managementUnreadCount}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-5">
          <p className="text-xs text-slate-500">Private Administration</p>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="mt-4 w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="min-h-screen md:ml-64">
        <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A46D]">
              Administration
            </p>

            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              {sectionTitles[activeSection]}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Manage your website and stay connected with your fan community.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#12192B] px-4 py-3">
            <p className="text-xs text-slate-500">Account status</p>

            <p className="mt-1 text-sm font-medium text-emerald-400">
              ● Administrator
            </p>
          </div>
        </header>

        <section className="px-6 py-8 sm:px-10">
          {activeSection === "overview" && renderOverview()}

          {(activeSection === "aaronInbox" ||
            activeSection === "managementInbox") &&
            renderFanMessages()}

          {activeSection === "fans" && renderFanAccounts()}

          {activeSection === "memberships" && (
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C5A46D]">
                  Fan Community
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Membership Management
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                  Manage registered fans, review their current membership tiers,
                  and update memberships after payment has been confirmed.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { name: "Fan", price: "$100" },
                  { name: "VIP", price: "$500" },
                  { name: "Gold", price: "$1,000" },
                ].map(function (tier) {
                  return (
                    <div
                      key={tier.name}
                      className="border border-[#C5A46D]/20 bg-white/[0.03] p-6"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-[#C5A46D]">
                        {tier.name} Membership
                      </p>

                      <p className="mt-4 text-3xl font-semibold text-white">
                        {tier.price}
                      </p>
                    </div>
                  );
                })}
              </div>

              {membershipMessage && (
                <div
                  className="border border-[#C5A46D]/30 bg-[#C5A46D]/10 px-4 py-3 text-sm text-[#D8BD8A]"
                  role="status"
                >
                  {membershipMessage}
                </div>
              )}

              <div className="overflow-x-auto border border-white/10">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="border-b border-white/10 bg-white/[0.03]">
                    <tr>
                      <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/50">
                        Fan
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/50">
                        Email
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/50">
                        Current Tier
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/50">
                        Change Tier
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wider text-white/50">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {fans.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-10 text-center text-sm text-white/50"
                        >
                          No registered fan accounts found.
                        </td>
                      </tr>
                    ) : (
                      fans.map(function (fan) {
                        const fanId = fan.id || fan._id;
                        const currentTier = fan.membershipTier || "Fan";

                        return (
                          <tr
                            key={fanId}
                            className="border-b border-white/10 last:border-0"
                          >
                            <td className="px-5 py-5 text-sm text-white">
                              {fan.displayName}
                            </td>

                            <td className="px-5 py-5 text-sm text-white/60">
                              {fan.email}
                            </td>

                            <td className="px-5 py-5">
                              <span className="inline-flex border border-[#C5A46D]/30 px-3 py-1 text-xs text-[#D8BD8A]">
                                {currentTier}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <select
                                value={
                                  membershipChanges[fanId] !== undefined
                                    ? membershipChanges[fanId]
                                    : currentTier
                                }
                                onChange={function (event) {
                                  setMembershipChanges(
                                    function (currentChanges) {
                                      return {
                                        ...currentChanges,
                                        [fanId]: event.target.value,
                                      };
                                    },
                                  );

                                  setMembershipMessage("");
                                }}
                                className="border border-white/15 bg-[#111111] px-3 py-2 text-sm text-white outline-none focus:border-[#C5A46D]"
                              >
                                <option value="Fan">Fan — $100</option>
                                <option value="VIP">VIP — $500</option>
                                <option value="Gold">Gold — $1,000</option>
                              </select>
                            </td>

                            <td className="px-5 py-5">
                              <button
                                type="button"
                                onClick={function () {
                                  const selectedTier =
                                    membershipChanges[fanId] !== undefined
                                      ? membershipChanges[fanId]
                                      : currentTier;

                                  if (selectedTier === currentTier) {
                                    setMembershipMessage(
                                      "Please select a different membership tier first.",
                                    );
                                    return;
                                  }

                                  updateFanMembership(fanId, selectedTier);
                                }}
                                disabled={
                                  membershipChanges[fanId] === undefined ||
                                  membershipChanges[fanId] === currentTier
                                }
                                className="border border-[#C5A46D] px-4 py-2 text-xs font-medium text-[#D8BD8A] transition hover:bg-[#C5A46D] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Save Tier
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "gallery" &&
            renderComingSoon(
              "Gallery Management",
              "This section will allow the administrator to add, edit, and delete gallery images displayed on your existing public Gallery page. The gallery API and database storage still need to be connected.",
            )}

          {activeSection === "settings" &&
            renderComingSoon(
              "Administration Settings",
              "This section will hold your administration preferences and account settings. The available settings still need to be implemented.",
            )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
