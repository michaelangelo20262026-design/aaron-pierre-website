function SectionHeading({
  number,
  label,
  title,
  description,
  titleClassName = "",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-7 md:flex-row md:items-end ${className}`}
    >
      <div>
        <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#D8BD8A]">
          {number} — {label}
        </p>

        <h2
          className={`text-5xl font-light tracking-[-0.06em] sm:text-7xl ${titleClassName}`}
        >
          {title}
          <span className="text-[#C5A46D]">.</span>
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-sm leading-7 text-white/45">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
