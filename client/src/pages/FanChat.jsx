import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function AaronProfile({ size = "md" }) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
  };

  return (
    <div
      className={`${sizes[size]} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C5A46D]/40 bg-[#141414]`}
    >
      <span className="text-xs tracking-wider text-[#D8BD8A]">AP</span>

      <img
        src="https://media.gq-magazine.co.uk/photos/609e84187c4de40838d62788/master/w_1280%2Cc_limit/150432021_GQStyle_03.jpg"
        alt="Aaron Pierre"
        className="absolute inset-0 h-full w-full object-cover object-top"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

function VerificationBadge() {
  return (
    <span
      title="Decorative verification-style badge"
      aria-label="Verification-style badge"
      className="inline-flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-[11px] font-bold leading-none text-white"
    >
      ✓
    </span>
  );
}

function FanChat() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fanProfile, setFanProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const imageInputRef = useRef(null);
  const messageHistoryRef = useRef(null);
  useEffect(function () {
    async function loadMessages() {
      const token = localStorage.getItem("fanToken");

      if (!token) {
        return;
      }

      try {
        const response = await fetch("https://aaron-pierre-backend.vercel.app/api/messages", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          return;
        }

        const savedMessages = data.messages.map(function (message) {
          return {
            ...message,
            time: new Date(message.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setMessages(savedMessages);
      } catch (error) {
        console.error("Unable to load messages:", error);
      }
    }

    loadMessages();
  }, []);

  useEffect(function () {
    async function loadFanProfile() {
      const token = localStorage.getItem("fanToken");

      if (!token) {
        return;
      }

      try {
        const response = await fetch("https://aaron-pierre-backend.vercel.app/api/fans/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFanProfile(data.fan);
        }
      } catch (error) {
        console.error("Unable to load fan profile:", error);
      }
    }

    loadFanProfile();
  }, []);

  useEffect(function () {
    async function loadUnreadCount() {
      const token = localStorage.getItem("fanToken");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          "https://aaron-pierre-backend.vercel.app/api/messages/unread-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error("Unable to load unread message count:", error);
      }
    }

    loadUnreadCount();

    const intervalId = setInterval(loadUnreadCount, 15000);

    return function () {
      clearInterval(intervalId);
    };
  }, []);
  if (localStorage.getItem("fanLoggedIn") !== "true") {
    return <Navigate to="/fan-login" replace />;
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Limit images to 5 MB.
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage({
        name: file.name,
        url: reader.result,
      });
    };

    reader.onerror = () => {
      setImageError("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  }

  function removeSelectedImage() {
    setSelectedImage(null);
    setImageError("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }
  async function handleSendMessage(event) {
    event.preventDefault();

    const trimmedMessage = messageInput.trim();

    if (!trimmedMessage && !selectedImage) {
      return;
    }

    const token = localStorage.getItem("fanToken");

    if (!token) {
      setImageError("Your session has expired. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        "https://aaron-pierre-backend.vercel.app/api/messages?recipient=aaron",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            recipient: "aaron",
            text: trimmedMessage,
            image: selectedImage?.url || "",
            imageName: selectedImage?.name || "",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setImageError(data.message || "Unable to send your message.");
        return;
      }

      const savedMessage = {
        ...data.data,
        time: new Date(data.data.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages(function (previousMessages) {
        return [...previousMessages, savedMessage];
      });

      setMessageInput("");
      setSelectedImage(null);
      setImageError("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      requestAnimationFrame(function () {
        messageHistoryRef.current?.scrollTo({
          top: messageHistoryRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    } catch (error) {
      setImageError(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
    }
  }

  return (
    <section
      id="fan-chat"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#090909] px-4 py-20 sm:px-8 lg:px-16 lg:py-28"
    >
      {/* Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 h-[350px] w-[350px] rounded-full bg-[#C5A46D]/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <div className="mb-10 border-b border-white/[0.08] pb-8 sm:mb-12">
          <p className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#D8BD8A]">
            <span className="h-px w-8 bg-[#C5A46D]" />
            Private Fan Messaging
          </p>

          <div className="mt-5">
            <h2 className="text-3xl font-light tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              A Private <span className="text-[#D8BD8A]">Conversation.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
              A dedicated space for individual conversations between fans and
              Aaron Pierre's account.
            </p>
          </div>
        </div>

        {/* Private Chat Window */}
        <div className="grid min-h-[650px] overflow-hidden border border-white/[0.1] bg-[#0D0D0D] lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Left Sidebar */}
          <aside className="flex flex-col border-b border-white/[0.08] lg:border-b-0 lg:border-r">
            <div className="border-b border-white/[0.08] p-6">
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
                Private Messages
              </p>

              <h3 className="mt-3 text-xl font-light">Your Inbox</h3>
            </div>

            {/* Aaron Conversation */}
            <div className="border-l-2 border-[#C5A46D] bg-[#C5A46D]/[0.07] p-5">
              <div className="flex items-start gap-3">
                <AaronProfile size="md" />

                <div className="min-w-0 flex-1">
                  <h4 className="flex flex-wrap items-center gap-2 text-sm font-medium text-white">
                    Aaron Pierre
                    <VerificationBadge />
                  </h4>

                  <p className="text-xs text-white/40">Official Account</p>

                  <p className="mt-3 break-words text-xs leading-6 text-white/40">
                    {messages.length > 0
                      ? messages[messages.length - 1].image
                        ? "📷 Image"
                        : messages[messages.length - 1].text ||
                          "Start your conversation"
                      : "Start your conversation"}
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Information */}
            <div className="mt-auto border-t border-white/[0.08] p-6">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 text-[#D8BD8A]">
                  🔒
                </span>

                <div>
                  <p className="text-xs text-white/70">Private conversation</p>

                  <p className="mt-2 text-[10px] leading-6 text-white/35">
                    This demonstration chat does not provide a direct connection
                    to Aaron Pierre.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Conversation Panel */}
          <div className="flex min-h-[600px] min-w-0 flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-4 border-b border-white/[0.08] px-4 py-5 sm:px-7">
              <AaronProfile size="md" />

              <div className="min-w-0 flex-1">
                <h3 className="flex flex-wrap items-center gap-2 text-sm font-medium sm:text-base">
                  Aaron Pierre
                  <VerificationBadge />
                </h3>

                <p className="text-xs text-white/40">Official Account</p>
              </div>
              <div className="hidden items-center gap-2 border border-white/[0.08] px-3 py-2 sm:flex">
                <span className="text-xs text-[#D8BD8A]">🔒</span>

                <span className="text-[9px] uppercase tracking-[0.12em] text-white/40">
                  Private Chat
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {unreadCount > 0 && (
                  <span
                    title={`${unreadCount} unread ${
                      unreadCount === 1 ? "message" : "messages"
                    } from Aaron`}
                    aria-label={`${unreadCount} unread messages from Aaron`}
                    className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#C5A46D] px-2 text-xs font-bold text-black"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
                {unreadCount > 0 && (
                  <span
                    title={`${unreadCount} unread messages from Aaron`}
                    aria-label={`${unreadCount} unread messages from Aaron`}
                    className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#C5A46D] px-2 text-xs font-bold text-black"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}

                <Link
                  to="/fan-profile"
                  title="View your profile"
                  className="flex shrink-0 items-center gap-2 border border-[#C5A46D]/30 px-2 py-2 transition hover:border-[#C5A46D] hover:bg-[#C5A46D]/[0.08] sm:px-3"
                >
                  <img
                    src={
                      fanProfile?.profilePicture ||
                      "https://placehold.co/80x80/151515/C5A46D?text=You"
                    }
                    alt="Your profile"
                    className="h-8 w-8 rounded-full border border-[#C5A46D]/50 object-cover"
                  />

                  <span className="max-w-[90px] truncate text-xs text-[#D8BD8A]">
                    {fanProfile?.displayName || "My Profile"}
                  </span>
                </Link>
              </div>
            </div>

            {/* Message History */}
            <div
              ref={messageHistoryRef}
              aria-live="polite"
              className="flex-1 space-y-7 overflow-y-auto p-4 sm:p-7 lg:p-9"
            >
              <div className="flex justify-center py-2">
                <span className="border border-white/[0.08] px-4 py-2 text-[8px] uppercase tracking-[0.16em] text-white/30">
                  Conversation History
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="flex min-h-[250px] items-center justify-center">
                  <p className="max-w-sm text-center text-sm leading-7 text-white/35">
                    Your conversation history will appear here.
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const isFanMessage = message.sender === "fan";

                  return (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        isFanMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isFanMessage && <AaronProfile size="sm" />}

                      <div
                        className={`flex max-w-[85%] flex-col sm:max-w-[75%] ${
                          isFanMessage ? "items-end" : "items-start"
                        }`}
                      >
                        <span className="mb-2 flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-white/35">
                          {isFanMessage ? (
                            "You"
                          ) : (
                            <>
                              Aaron Pierre
                              <VerificationBadge />
                            </>
                          )}
                        </span>

                        <div
                          className={`space-y-3 border px-4 py-3 sm:px-5 sm:py-4 ${
                            isFanMessage
                              ? "border-[#C5A46D]/35 bg-[#C5A46D]/[0.09] text-white/85"
                              : "border-white/[0.09] bg-white/[0.025] text-white/65"
                          }`}
                        >
                          {message.image && (
                            <img
                              src={message.image}
                              alt={message.imageName || "Shared image"}
                              className="max-h-[350px] max-w-full rounded object-contain"
                            />
                          )}

                          {message.text && (
                            <p className="whitespace-pre-wrap break-words text-sm leading-7">
                              {message.text}
                            </p>
                          )}
                        </div>

                        <span className="mt-2 text-[9px] text-white/25">
                          {message.time}
                        </span>
                      </div>

                      {isFanMessage && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.04] text-[9px] text-white/60">
                          YOU
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-white/[0.08] p-4 sm:p-6 lg:p-7">
              {/* Selected Image Preview */}
              {selectedImage && (
                <div className="mb-4 flex items-start gap-3 border border-white/[0.1] bg-white/[0.02] p-3">
                  <img
                    src={selectedImage.url}
                    alt="Selected image preview"
                    className="h-20 w-20 shrink-0 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-all text-xs text-white/70">
                      {selectedImage.name}
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Ready to send
                    </p>

                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="mt-2 text-[10px] uppercase tracking-wider text-red-300 hover:text-red-200"
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              )}

              {imageError && (
                <p role="alert" className="mb-3 text-xs text-red-300">
                  {imageError}
                </p>
              )}

              <form onSubmit={handleSendMessage}>
                <label
                  htmlFor="private-fan-message"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/40"
                >
                  Your Message
                </label>

                <div className="flex items-end gap-3">
                  {/* Hidden Image Input */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    aria-label="Choose an image"
                  />

                  {/* Image Button */}
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    title="Attach an image"
                    aria-label="Attach an image"
                    className="flex h-14 w-12 shrink-0 items-center justify-center border border-white/[0.1] text-xl text-[#D8BD8A] transition hover:border-[#C5A46D]/60 hover:bg-white/[0.04]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </button>

                  <textarea
                    id="private-fan-message"
                    rows={2}
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder="Write a message..."
                    className="min-h-[56px] min-w-0 flex-1 resize-y border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/60"
                  />

                  <button
                    type="submit"
                    disabled={!messageInput.trim() && !selectedImage}
                    className="flex min-h-[56px] shrink-0 items-center justify-center gap-2 bg-[#C5A46D] px-4 text-[9px] font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
                  >
                    Send
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>

                <p className="mt-3 text-[9px] leading-5 text-white/25">
                  Attach an image or write a message. Images must be 5 MB or
                  smaller. Press Enter to send or Shift + Enter for a new line.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-5 flex items-start gap-3">
          <span aria-hidden="true" className="mt-1 text-[#D8BD8A]">
            ✦
          </span>

          <p className="max-w-3xl text-[10px] leading-6 text-white/35">
            This is a fan-chat demonstration. Messages and images stay within
            this interface and are not delivered to Aaron Pierre. The blue badge
            is a decorative design element, not confirmation of account
            verification.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FanChat;
