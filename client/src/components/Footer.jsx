function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Career", href: "#career" },
    { label: "Gallery", href: "#gallery" },
    { label: "Fan Community", href: "#fan-community" },
    { label: "Management", href: "#management-chat" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <footer className="border-t border-white/[0.08] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Footer Main Content */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo and Brand */}
          <a href="#home" className="group flex w-fit items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#C5A46D]/50 text-sm font-semibold tracking-wider text-[#D8BD8A] transition group-hover:bg-[#C5A46D] group-hover:text-black">
              AP
            </span>

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
              Official Website
            </span>
          </a>

          {/* Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-4"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[9px] uppercase tracking-[0.18em] text-white/40 transition hover:text-[#D8BD8A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <a
            href="#home"
            className="flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:text-[#D8BD8A]"
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] tracking-[0.1em] text-white/30">
            © {currentYear} Aaron Pierre. All rights reserved.
          </p>

          <p className="text-[9px] tracking-[0.1em] text-white/30">
            A celebration of film, storytelling, and the art of performance.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
