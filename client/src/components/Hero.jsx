import { useState } from "react";
import Button from "./Button.jsx";

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const portraitUrl =
    "https://commons.wikimedia.org/wiki/Special:FilePath/Aaron_Pierre_at_San_Diego_Comic_Con_2026-2.jpg";

  return (
    <section
      id="home"
      className="hero-section relative isolate flex min-h-[760px] items-center overflow-hidden lg:min-h-[850px]"
    >
      {/* Ambient Lighting */}
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/95 to-[#090909]/30" />

      {/* Aaron Pierre Hero Portrait */}
      <div className="hero-portrait absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[57%]">
        {!imageError && (
          <img
            src={portraitUrl}
            alt="Aaron Pierre at San Diego Comic-Con"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
              imageLoaded ? "opacity-70" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            fetchPriority="high"
          />
        )}

        {/* Cinematic Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/50 to-transparent" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/20" />

        {/* Subtle Gold Lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[#C5A46D]/[0.04] mix-blend-screen" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
        <div className="max-w-4xl">
          {/* Introductory Label */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#C5A46D]" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#D8BD8A] sm:text-xs">
              Film · Television · Storytelling
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-[clamp(4.2rem,12vw,10.5rem)] font-light leading-[0.79] tracking-[-0.085em]">
            AARON
            <br />
            <span className="mt-3 block font-semibold">
              PIERRE<span className="text-[#C5A46D]">.</span>
            </span>
          </h1>

          {/* Description */}
          <div className="mt-10 max-w-xl border-l border-[#C5A46D]/60 pl-5 sm:mt-14 sm:pl-7">
            <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Exploring the craft, the characters, and the stories that leave a
              lasting impression.
            </p>
          </div>

          {/* Hero Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-12">
            {/* Explore Career */}
            <Button href="#career" className="group gap-5 px-6 sm:px-8">
              Explore the career
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>

            {/* Chat with Aaron Pierre */}
            <a
              href="/fan-chat"
              className="inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/30 sm:px-7"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              Chat with Aaron Pierre
              <span aria-hidden="true">↗</span>
            </a>

            {/* Discover More */}
            <a
              href="#about"
              className="px-2 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:text-white"
            >
              Discover more
            </a>
          </div>
        </div>
      </div>

      {/* Hero Footer Details */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.09]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>A journey through performance and craft</span>

          <a
            href="#about"
            className="flex w-fit items-center gap-3 transition hover:text-[#D8BD8A]"
          >
            Scroll to explore
            <span className="text-[#C5A46D]">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
