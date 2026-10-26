import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  function openFanChat() {
    window.dispatchEvent(new Event("fan-chat-open"));
    setMenuOpen(false);
  }

  useEffect(function () {
    async function loadUnreadCount() {
      const token = localStorage.getItem("fanToken");

      if (!token) {
        setUnreadCount(0);
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

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setUnreadCount(data.count || 0);
      } catch (error) {
        console.error("Unable to load unread message count:", error);
      }
    }

    loadUnreadCount();

    const intervalId = setInterval(loadUnreadCount, 5000);

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Career", to: "/career" },
    { label: "Gallery", to: "/gallery" },
    { label: "Fan Community", to: "/fan-community" },
    { label: "Fan Chat", to: "/fan-chat" },
    { label: "Management", to: "/management" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090909]/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[90px] max-w-[1900px] items-center gap-6 px-6 sm:px-8 xl:px-12">
        {/* Brand: Logo and Website Name */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center border border-[#C5A46D]/60 text-base font-semibold tracking-wider text-[#D8BD8A] transition duration-300 group-hover:bg-[#C5A46D] group-hover:text-black">
            AP
          </span>

          <span className="block">
            <span className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              Aaron Pierre
            </span>

            <span className="mt-1 block whitespace-nowrap text-[8px] uppercase tracking-[0.24em] text-white/45">
              Official Website
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 gap-y-3 lg:flex xl:gap-x-5 2xl:gap-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={link.to === "/fan-chat" ? openFanChat : undefined}
              aria-current={isActive(link.to) ? "page" : undefined}
              className={`group relative whitespace-nowrap py-2 text-[9px] font-medium uppercase tracking-[0.06em] transition-all duration-300 xl:text-[10px] xl:tracking-[0.08em] ${
                isActive(link.to)
                  ? "text-[#D8BD8A]"
                  : "text-white/60 hover:text-[#D8BD8A]"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {link.label}

                {link.to === "/fan-chat" && unreadCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </span>

              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#C5A46D] transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            to="/fan-chat"
            onClick={openFanChat}
            className="relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition duration-300 hover:bg-emerald-400"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            Chat
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#090909] bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/contact"
            className="whitespace-nowrap border border-[#C5A46D]/60 px-4 py-3 text-[9px] font-medium uppercase tracking-[0.06em] text-[#D8BD8A] transition duration-300 hover:bg-[#C5A46D] hover:text-black"
          >
            Business Enquiries
          </Link>
        </div>

        {/* Mobile and Tablet Controls */}
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:hidden">
          <Link
            to="/fan-chat"
            onClick={openFanChat}
            className="relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-emerald-400"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            Chat
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#090909] bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-xl text-[#D8BD8A] transition hover:border-[#C5A46D]"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile and Tablet Menu */}
      {menuOpen && (
        <div className="border-t border-white/[0.08] bg-[#090909] px-6 py-5 sm:px-8 lg:hidden">
          <div className="mx-auto flex max-w-[1600px] flex-col">
            {/* Brand on Smaller Screens */}
            <div className="mb-4 flex items-center gap-3 border-b border-white/[0.08] pb-5">
              <span className="flex h-10 w-10 items-center justify-center border border-[#C5A46D]/60 text-sm font-semibold text-[#D8BD8A]">
                AP
              </span>

              <span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white">
                  Aaron Pierre
                </span>

                <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-white/40">
                  Official Website
                </span>
              </span>
            </div>

            {/* All Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.to === "/fan-chat" ? openFanChat : closeMenu}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={`flex items-center justify-between border-b border-white/[0.06] py-4 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive(link.to)
                    ? "border-l-2 border-l-[#C5A46D] pl-3 font-semibold text-[#D8BD8A]"
                    : "text-white/65 hover:pl-3 hover:text-[#D8BD8A]"
                }`}
              >
                {link.label}

                {isActive(link.to) && (
                  <span className="text-base text-[#C5A46D]">✦</span>
                )}
              </Link>
            ))}

            {/* Business Enquiries */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-5 border border-[#C5A46D]/60 px-5 py-4 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#D8BD8A] transition hover:bg-[#C5A46D] hover:text-black"
            >
              Business Enquiries
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
