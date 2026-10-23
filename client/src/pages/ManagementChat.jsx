import { useState } from "react";

function ManagementChat() {
  const [selectedCategory, setSelectedCategory] = useState("General Enquiry");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "management",
      text: "Welcome to the official management enquiry desk.",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "management",
      text: "How may we assist you today? You can enquire about bookings, appointments, membership, payments, or business opportunities.",
      time: "10:00 AM",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  async function handleSendMessage(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFeedback("Please enter your name, email, and message.");
      setFeedbackType("error");
      return;
    }

    setIsSending(true);
    setFeedback("");
    setFeedbackType("");

    try {
      const response = await fetch(
        "https://aaron-pierre-backend.vercel.app/api/public-enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            category: selectedCategory,
            text: trimmedMessage,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setFeedback(data.message || "Unable to send your enquiry.");
        setFeedbackType("error");
        return;
      }

      const newMessage = {
        id: data.data.id,
        sender: "visitor",
        text: data.data.text,
        time: new Date(data.data.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages(function (previousMessages) {
        return [...previousMessages, newMessage];
      });

      setName("");
      setEmail("");
      setMessage("");
      setFeedback(
        "Your enquiry has been sent successfully. The management team can now receive it.",
      );
      setFeedbackType("success");
    } catch (error) {
      setFeedback(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
      setFeedbackType("error");
    } finally {
      setIsSending(false);
    }
  }

  const categories = [
    {
      title: "General Enquiry",
      description: "Questions and assistance",
      icon: "✦",
    },
    {
      title: "Bookings & Appointments",
      description: "Professional and event requests",
      icon: "◷",
    },
    {
      title: "Membership & Payments",
      description: "Membership cards and payment enquiries",
      icon: "◇",
    },
    {
      title: "Business Opportunities",
      description: "Partnerships and collaborations",
      icon: "↗",
    },
  ];

  return (
    <section
      id="management-chat"
      className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#C9A45C]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#C9A45C]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#C9A45C]">
            Official Management
          </p>

          <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
            Professional{" "}
            <span className="font-semibold text-[#C9A45C]">Enquiries</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Connect with the management team regarding bookings, appointments,
            membership enquiries, payments, and professional opportunities.
          </p>
        </div>

        {/* Chat layout */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#101010] shadow-2xl lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Left sidebar */}
          <aside className="border-b border-white/10 bg-[#0C0C0C] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            {/* Management profile */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C9A45C]/40 bg-[#C9A45C]/10 text-2xl text-[#C9A45C]">
                ✦
              </div>

              <div>
                <h3 className="font-semibold tracking-wide">Aaron Pierre</h3>

                <p className="mt-1 text-xs text-white/45">
                  Official Management Desk
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />

                  <span className="text-[11px] text-white/45">
                    Enquiry Support
                  </span>
                </div>
              </div>
            </div>

            {/* Enquiry categories */}
            <div className="mt-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                Enquiry Categories
              </p>

              <div className="space-y-2">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category.title;

                  return (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => setSelectedCategory(category.title)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition duration-300 ${
                        isSelected
                          ? "border-[#C9A45C]/40 bg-[#C9A45C]/10"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 text-lg ${
                          isSelected ? "text-[#C9A45C]" : "text-white/40"
                        }`}
                      >
                        {category.icon}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-medium ${
                            isSelected ? "text-[#C9A45C]" : "text-white/80"
                          }`}
                        >
                          {category.title}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-white/40">
                          {category.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privacy note */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[#C9A45C]">◇</span>

                <p className="text-xs font-semibold text-white/80">
                  Private Enquiries
                </p>
              </div>

              <p className="text-xs leading-6 text-white/40">
                Enquiries are intended for the management team. Do not send
                passwords, bank PINs, or other sensitive financial information.
              </p>
            </div>
          </aside>

          {/* Right chat panel */}
          <div className="flex min-h-[600px] flex-col sm:min-h-[650px]">
            {/* Chat header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45C]">
                  Current Enquiry
                </p>

                <h3 className="mt-2 text-base font-semibold sm:text-lg">
                  {selectedCategory}
                </h3>

                <p className="mt-1 text-xs text-white/40">
                  Official management communication
                </p>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-lg text-[#C9A45C] sm:flex">
                ✦
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
              <div className="py-2 text-center">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Enquiry Conversation
                </span>
              </div>

              {messages.map((item) => {
                const isVisitor = item.sender === "visitor";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isVisitor ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[75%] ${
                        isVisitor ? "items-end" : "items-start"
                      } flex flex-col`}
                    >
                      <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-white/35">
                        {isVisitor ? "You" : "Management Team"}
                      </p>

                      <div
                        className={`rounded-2xl px-4 py-3 sm:px-5 ${
                          isVisitor
                            ? "rounded-br-sm border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-white"
                            : "rounded-bl-sm border border-white/10 bg-[#181818] text-white/80"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm leading-7">
                          {item.text}
                        </p>
                      </div>

                      <span className="mt-2 text-[10px] text-white/30">
                        {item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message composer */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-white/10 bg-[#0C0C0C] p-4 sm:p-6"
            >
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="management-name"
                    className="mb-2 block text-xs text-white/45"
                  >
                    Your name
                  </label>

                  <input
                    id="management-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#C9A45C]/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="management-email"
                    className="mb-2 block text-xs text-white/45"
                  >
                    Your email
                  </label>

                  <input
                    id="management-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#C9A45C]/50"
                  />
                </div>
              </div>

              <label
                htmlFor="management-message"
                className="mb-3 block text-xs text-white/45"
              >
                Message about:{" "}
                <span className="text-[#C9A45C]">{selectedCategory}</span>
              </label>

              <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#151515] p-3 transition focus-within:border-[#C9A45C]/50">
                <textarea
                  id="management-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form.requestSubmit();
                    }
                  }}
                  rows={2}
                  required
                  placeholder="Write your enquiry here..."
                  className="max-h-36 min-h-12 flex-1 resize-y bg-transparent px-2 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/25"
                />

                <button
                  type="submit"
                  disabled={
                    isSending ||
                    !name.trim() ||
                    !email.trim() ||
                    !message.trim()
                  }
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A45C] text-xl text-black transition hover:bg-[#D8B875] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSending ? "…" : "↗"}
                </button>
              </div>

              {feedback && (
                <p
                  role="status"
                  className={`mt-3 text-xs leading-5 ${
                    feedbackType === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <div className="mt-3 flex flex-col justify-between gap-2 text-[10px] text-white/30 sm:flex-row sm:items-center">
                <span>Press Enter to send · Shift + Enter for a new line</span>

                <span>Official management channel</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManagementChat;
