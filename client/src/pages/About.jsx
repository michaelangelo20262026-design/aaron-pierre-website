import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";

function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const highlights = [
    {
      number: "01",
      title: "The Craft",
      description:
        "A thoughtful approach to performance, shaped by preparation, emotional depth, and a commitment to every character.",
    },
    {
      number: "02",
      title: "The Transformation",
      description:
        "From grounded dramatic performances to iconic animated characters, Aaron continues to explore different dimensions of storytelling.",
    },
    {
      number: "03",
      title: "The Vision",
      description:
        "A growing body of work defined by ambition, versatility, collaboration, and a willingness to embrace challenging roles.",
    },
  ];

  const careerMoments = [
    {
      year: "2021",
      title: "The Underground Railroad",
      role: "Caesar",
      description:
        "A powerful historical drama that introduced his work to a wider international audience.",
    },
    {
      year: "2021",
      title: "Old",
      role: "Mid-Sized Sedan",
      description:
        "A mysterious thriller that added another distinctive character to his growing screen career.",
    },
    {
      year: "2024",
      title: "Rebel Ridge",
      role: "Terry Richmond",
      description:
        "A restrained yet commanding performance that brought him significant international attention.",
    },
    {
      year: "2024",
      title: "Mufasa: The Lion King",
      role: "Voice of Mufasa",
      description:
        "A major voice role that introduced his performance to audiences across generations.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#080808] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#C5A46D]/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* SECTION HEADING */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            number="01"
            label="The Artist"
            title="Beyond the characters. Beyond the frame."
          />

          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-sm leading-8 text-white/60 sm:text-base sm:leading-9">
              Every memorable performance begins with a story. Discover the
              background, creative journey, and defining roles of an actor whose
              work continues to reach audiences around the world.
            </p>

            <Link
              to="/career"
              className="group mt-8 inline-flex w-fit items-center gap-5 border-b border-[#C5A46D]/50 pb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#D8BD8A] transition duration-300 hover:border-[#D8BD8A] hover:text-white"
            >
              Explore the journey
              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* FEATURED BIOGRAPHY */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* PORTRAIT */}
          <div className="group relative mx-auto w-full max-w-[540px]">
            <div className="absolute -inset-3 border border-[#C5A46D]/20 transition duration-500 group-hover:inset-0" />

            <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
              <img
                src="https://media.gq-magazine.co.uk/photos/609e84187c4de40838d62788/master/w_1280%2Cc_limit/150432021_GQStyle_03.jpg"
                alt="Aaron Pierre in an editorial portrait"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className={`h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04] ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              <div className="absolute bottom-6 left-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#D8BD8A]">
                  The Artist
                </p>
                <p className="mt-2 text-2xl font-light tracking-wide sm:text-3xl">
                  Aaron Pierre
                </p>
              </div>
            </div>

            <span className="absolute -bottom-5 -right-2 text-6xl font-light text-[#C5A46D]/20 sm:-right-5 sm:text-8xl">
              AP
            </span>
          </div>

          {/* BIOGRAPHY */}
          <div className="relative py-4 lg:py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A46D]">
              A closer introduction
            </p>

            <h2 className="mt-6 max-w-2xl text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              An actor with a presence that stays with you.
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-8 text-white/55 sm:text-base sm:leading-9">
              <p>
                Born in South London, England, Aaron Pierre is a British actor
                whose performances span television, film, and voice acting. He
                trained at the London Academy of Music and Dramatic Art (LAMDA),
                developing the foundations of his work as a performer.
              </p>

              <p>
                His career includes the acclaimed series{" "}
                <span className="text-white/85">The Underground Railroad</span>,
                the psychological thriller{" "}
                <span className="text-white/85">Old</span>, and the historical
                drama <span className="text-white/85">Genius: MLK/X</span>,
                where he portrayed Malcolm X.
              </p>

              <p>
                In 2024, he reached a wider global audience through{" "}
                <span className="text-white/85">Rebel Ridge</span>, playing
                Terry Richmond, and voiced the younger Mufasa in{" "}
                <span className="text-white/85">Mufasa: The Lion King</span>.
                These projects reflect his range across very different kinds of
                storytelling.
              </p>

              <p>
                His journey is still unfolding, with each new role offering
                another opportunity to explore character, challenge
                expectations, and connect with audiences.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-light text-[#D8BD8A] sm:text-3xl">
                  Film
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                  Screen performances
                </p>
              </div>

              <div>
                <p className="text-2xl font-light text-[#D8BD8A] sm:text-3xl">
                  Theatre
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                  Foundations in performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ARTISTIC PRINCIPLES */}
        <div className="mt-28 lg:mt-40">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A46D]">
              The philosophy
            </p>

            <h2 className="mt-5 text-3xl font-light tracking-tight sm:text-4xl">
              The work behind the performance.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
              Every character begins with a process. Every performance reveals
              another dimension. Every new project opens another possibility.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* THE CRAFT */}
            <article className="group relative isolate min-h-[440px] overflow-hidden bg-[#141414]">
              <img
                src="https://media.gq-magazine.co.uk/photos/609e84187c4de40838d62788/master/w_1280%2Cc_limit/150432021_GQStyle_03.jpg"
                alt="Aaron Pierre in an editorial portrait"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 transition duration-500 group-hover:from-black/90" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-[#D8BD8A]">
                  01 / THE CRAFT
                </span>

                <h3 className="mt-4 text-2xl font-light tracking-wide text-white sm:text-3xl">
                  The Craft
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                  The preparation, discipline, and attention to detail that help
                  transform a script into a believable character.
                </p>

                <div className="mt-6 h-px w-12 bg-[#C5A46D] transition-all duration-500 group-hover:w-20" />
              </div>
            </article>

            {/* THE PERFORMANCE */}
            <article className="group relative isolate min-h-[440px] overflow-hidden bg-[#141414]">
              <img
                src="https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQdI1VRcahttuSqck_d8ZhuP6Ypzw13zlhz7e2MgFxujj400H80jVOlLnBmsSu9xadmeCACbqFvOktByK3nnqffLUQw2fusHDl1EeDe-g-mxNpTIzb4IceGcASa7dFB7Z_N2_VvJ8uMBipDWv-PQOdzk4.jpg?r=244"
                alt="Aaron Pierre in a cinematic role"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 transition duration-500 group-hover:from-black/90" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-[#D8BD8A]">
                  02 / THE PERFORMANCE
                </span>

                <h3 className="mt-4 text-2xl font-light tracking-wide text-white sm:text-3xl">
                  The Performance
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                  From intense dramatic moments to commanding screen presence,
                  each role offers a new way to connect with an audience.
                </p>

                <div className="mt-6 h-px w-12 bg-[#C5A46D] transition-all duration-500 group-hover:w-20" />
              </div>
            </article>

            {/* THE VISION */}
            <article className="group relative isolate min-h-[440px] overflow-hidden bg-[#141414]">
              <img
                src="https://imgix.bustle.com/uploads/image/2021/7/19/bcc8e1bd-6f00-42c0-9b90-a6159488900c-6b10061a-512e-46d0-be5d-fa1f963897bd-210218-aaron-pierre-s01-020-copy.jpeg?fit=crop&fm=jpg&w=1200"
                alt="Aaron Pierre in a portrait from his acting career"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 transition duration-500 group-hover:from-black/90" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <span className="text-[10px] tracking-[0.25em] text-[#D8BD8A]">
                  03 / THE VISION
                </span>

                <h3 className="mt-4 text-2xl font-light tracking-wide text-white sm:text-3xl">
                  The Vision
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                  An evolving artistic journey shaped by ambitious projects,
                  different characters, and the possibilities of storytelling.
                </p>

                <div className="mt-6 h-px w-12 bg-[#C5A46D] transition-all duration-500 group-hover:w-20" />
              </div>
            </article>
          </div>
        </div>

        {/* CAREER SNAPSHOT */}
        <div className="mt-28 lg:mt-40">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A46D]">
                Selected works
              </p>

              <h2 className="mt-5 text-3xl font-light tracking-tight sm:text-4xl">
                Moments along the way.
              </h2>
            </div>

            <Link
              to="/career"
              className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:text-[#D8BD8A]"
            >
              View full career
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10">
            {careerMoments.map((moment) => (
              <article
                key={moment.title}
                className="grid gap-3 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[80px_1fr_1.2fr] sm:items-start sm:gap-8 sm:px-4"
              >
                <span className="text-sm tracking-widest text-[#C5A46D]">
                  {moment.year}
                </span>

                <div>
                  <h3 className="text-lg font-light text-white sm:text-xl">
                    {moment.title}
                  </h3>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {moment.role}
                  </p>
                </div>

                <p className="text-sm leading-7 text-white/45">
                  {moment.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <div className="relative mt-28 overflow-hidden border-y border-white/10 py-16 text-center sm:py-24 lg:mt-40">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A46D]/[0.05] to-transparent" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C5A46D]">
              The journey continues
            </p>

            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight sm:text-5xl">
              Every role tells a story.
              <span className="mt-2 block text-white/40">
                This is only the beginning.
              </span>
            </h2>

            <Link
              to="/career"
              className="group mt-9 inline-flex items-center gap-4 border border-[#C5A46D]/50 px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-[#D8BD8A] transition duration-300 hover:bg-[#C5A46D] hover:text-black"
            >
              Discover his career
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
