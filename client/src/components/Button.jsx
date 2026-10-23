function Button({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-3 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition duration-300";

  const appearanceClasses = disabled
    ? "cursor-not-allowed bg-[#C5A46D]/40 text-[#111111]/60"
    : "bg-[#C5A46D] text-[#111111] hover:bg-[#E0C99E]";

  const combinedClasses = `${baseClasses} ${appearanceClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-disabled={disabled || undefined}
        className={`${combinedClasses} ${
          disabled ? "pointer-events-none" : ""
        }`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClasses} disabled:opacity-60`}
    >
      {children}
    </button>
  );
}

export default Button;
