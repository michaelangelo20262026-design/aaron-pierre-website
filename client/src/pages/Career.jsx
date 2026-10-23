import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";

function Career() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [failedImages, setFailedImages] = useState([]);

  const careerHighlights = [
    {
      number: "01",
      category: "REBEL RIDGE",
      title: "Terry Richmond",
      description:
        "Aaron Pierre leads the intense Netflix thriller as Terry Richmond.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/img/27/02/2702108ffa23232f911c07b061ebe7e6.jpg",
      link: "/gallery",
      linkLabel: "Explore the gallery",
      size: "large",
    },
    {
      number: "02",
      category: "REBEL RIDGE",
      title: "A Powerful Performance",
      description:
        "A striking moment from Aaron Pierre's performance in Rebel Ridge.",
      image:
        "https://fr.web.img3.acsta.net/r_1280_720/img/92/da/92da7905911c161e3bfe326d2a1a55be.jpg",
      link: "/gallery",
      linkLabel: "View the image",
      size: "normal",
    },
    {
      number: "03",
      category: "REBEL RIDGE",
      title: "Inside the Story",
      description: "A cinematic look at Aaron Pierre in the action thriller.",
      image:
        "https://fr.web.img6.acsta.net/r_1280_720/img/4f/fa/4ffa1b238a18c0c878640445cc45d600.jpg",
      link: "/gallery",
      linkLabel: "Discover more",
      size: "normal",
    },
    {
      number: "04",
      category: "REBEL RIDGE",
      title: "The Character",
      description:
        "Aaron Pierre brings determination and intensity to Terry Richmond.",
      image:
        "https://fr.web.img5.acsta.net/r_1280_720/img/a9/98/a99802e4b734f571edcc7b080b926d13.jpg",
      link: "/gallery",
      linkLabel: "Explore the performance",
      size: "normal",
    },
    {
      number: "05",
      category: "REBEL RIDGE",
      title: "On Screen",
      description:
        "Another cinematic moment featuring Aaron Pierre in Rebel Ridge.",
      image:
        "https://fr.web.img5.acsta.net/r_1280_720/img/1a/60/1a6042d1cda34b546cc2662acabfe576.jpg",
      link: "/gallery",
      linkLabel: "View the gallery",
      size: "large",
    },
    {
      number: "06",
      category: "REBEL RIDGE",
      title: "A Moment of Tension",
      description: "A dramatic scene from the film starring Aaron Pierre.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/img/d7/4e/d74e3ca00fccb7dcdf27cf98456c15d4.jpg",
      link: "/gallery",
      linkLabel: "Discover the scene",
      size: "normal",
    },
    {
      number: "07",
      category: "REBEL RIDGE",
      title: "Terry Richmond",
      description: "Aaron Pierre in character in the Netflix action thriller.",
      image:
        "https://fr.web.img3.acsta.net/r_1280_720/img/1b/ee/1bee54204dfe0555cf685507d5f481da.jpg",
      link: "/gallery",
      linkLabel: "Explore the film",
      size: "normal",
    },
    {
      number: "08",
      category: "REBEL RIDGE",
      title: "A Defining Scene",
      description: "A tense cinematic moment featuring Aaron Pierre.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/pictures/23/09/06/11/33/2962752.jpg",
      link: "/gallery",
      linkLabel: "View more",
      size: "normal",
    },
    {
      number: "09",
      category: "THE UNDERGROUND RAILROAD",
      title: "Caesar",
      description:
        "Aaron Pierre portrays Caesar in Barry Jenkins' acclaimed series.",
      image:
        "https://fr.web.img3.acsta.net/r_1280_720/pictures/21/04/27/12/58/0054157.jpg",
      link: "/gallery",
      linkLabel: "Explore the series",
      size: "large",
    },
    {
      number: "10",
      category: "THE UNDERGROUND RAILROAD",
      title: "A Period Performance",
      description: "Aaron Pierre in a scene from The Underground Railroad.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/pictures/21/04/27/12/58/0068197.jpg",
      link: "/gallery",
      linkLabel: "View the image",
      size: "normal",
    },
    {
      number: "11",
      category: "OLD",
      title: "Mid-Sized Sedan",
      description:
        "Aaron Pierre appears as Mid-Sized Sedan in M. Night Shyamalan's thriller Old.",
      image:
        "https://fr.web.img5.acsta.net/r_1280_720/pictures/21/05/27/17/22/0465057.jpg",
      link: "/gallery",
      linkLabel: "Explore the film",
      size: "normal",
    },
    {
      number: "12",
      category: "FOE",
      title: "Terrance",
      description:
        "Aaron Pierre stars as Terrance in the science-fiction drama Foe.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/pictures/23/09/06/11/33/2962752.jpg",
      link: "/gallery",
      linkLabel: "Discover the performance",
      size: "large",
    },
    {
      number: "13",
      category: "KRYPTON",
      title: "Dev-Em",
      description:
        "Aaron Pierre plays Dev-Em in the science-fiction series Krypton.",
      image:
        "https://fr.web.img6.acsta.net/r_1280_720/pictures/17/09/26/15/54/2707824.jpg",
      link: "/gallery",
      linkLabel: "Explore Krypton",
      size: "normal",
    },
    {
      number: "14",
      category: "KRYPTON",
      title: "A Science-Fiction World",
      description: "A scene from Aaron Pierre's work in Krypton.",
      image:
        "https://fr.web.img3.acsta.net/r_1280_720/pictures/18/04/06/13/39/3553305.jpg",
      link: "/gallery",
      linkLabel: "View the scene",
      size: "normal",
    },
    {
      number: "15",
      category: "BRITANNIA",
      title: "Antonius",
      description:
        "Aaron Pierre appears as Antonius in the historical fantasy series Britannia.",
      image:
        "https://fr.web.img3.acsta.net/r_1280_720/pictures/19/08/02/09/49/4088117.jpg",
      link: "/gallery",
      linkLabel: "Discover Britannia",
      size: "normal",
    },
    {
      number: "16",
      category: "THE UNDERGROUND RAILROAD",
      title: "A Story of Resilience",
      description:
        "A dramatic image from the series featuring Aaron Pierre as Caesar.",
      image:
        "https://fr.web.img4.acsta.net/r_1280_720/pictures/21/04/27/12/58/0054157.jpg",
      link: "/gallery",
      linkLabel: "View the series",
      size: "large",
    },
    {
      number: "17",
      category: "REBEL RIDGE",
      title: "A Cinematic Portrait",
      description: "Aaron Pierre in his leading role as Terry Richmond.",
      image:
        "https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQdI1VRcahttuSqck_d8ZhuP6Ypzw13zlhz7e2MgFxujj400H80jVOlLnBmsSu9xadmeCACbqFvOktByK3nnqffLUQw2fusHDl1EeDe-g-mxNpTIzb4IceGcASa7dFB7Z_N2_VvJ8uMBipDWv-PQOdzk4.jpg?r=244",
      link: "/gallery",
      linkLabel: "View the portrait",
      size: "normal",
    },
    {
      number: "18",
      category: "REBEL RIDGE",
      title: "The Leading Role",
      description:
        "A promotional image associated with Aaron Pierre's Netflix thriller.",
      image:
        "https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQTnTQZ6dvfCb7KcM8QwaZnwcTIGbWPqr3-0gO8cEvlF55EtfW8jSBTPubLn4f8GGtqxeyAhlk4O2GXVGYdSSVWc0L6U8Un9ZeMs_F4mr1i5-XuzzNN5uN3mcSA4yCBYm_plfNsrPJdecNTsgEe3-SW_e.jpg?r=851",
      link: "/gallery",
      linkLabel: "Explore the film",
      size: "normal",
    },
    {
      number: "19",
      category: "THE UNDERGROUND RAILROAD",
      title: "Caesar's Journey",
      description: "A visual from Aaron Pierre's work in the historical drama.",
      image:
        "https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQTAvczbsx4D7dPZDM8Z4xXDuenOXcsU9y_w8ZIKWiBkMhX3s0rngk3PUrS9Vs6dbdmaRW5OqjniK5jYrVDL3i9WwXwqW9DMYWyeszxU3R6V7y3DWXGyZEeHrX_WLQ4qBr0OoMDKZuOBI8HV5iamEzhtt.jpg?r=80d",
      link: "/gallery",
      linkLabel: "Discover the story",
      size: "large",
    },
    {
      number: "20",
      category: "CAREER HIGHLIGHTS",
      title: "Aaron Pierre on Screen",
      description:
        "A collection celebrating Aaron Pierre's screen performances and career.",
      image:
        "https://fr.web.img5.acsta.net/r_1280_720/img/1a/60/1a6042d1cda34b546cc2662acabfe576.jpg",
      link: "/gallery",
      linkLabel: "Explore the collection",
      size: "normal",
    },
  ];
  const isViewerOpen = selectedIndex !== null;

  const selectedImage =
    selectedIndex !== null ? careerHighlights[selectedIndex] : null;

  function closeViewer() {
    setSelectedIndex(null);
  }

  function showPreviousImage() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return (
        (currentIndex - 1 + careerHighlights.length) % careerHighlights.length
      );
    });
  }

  function showNextImage() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) return null;

      return (currentIndex + 1) % careerHighlights.length;
    });
  }

  function markImageAsFailed(imageUrl) {
    setFailedImages((currentImages) =>
      currentImages.includes(imageUrl)
        ? currentImages
        : [...currentImages, imageUrl],
    );
  }

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) return null;

          return (
            (currentIndex - 1 + careerHighlights.length) %
            careerHighlights.length
          );
        });
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) return null;

          return (currentIndex + 1) % careerHighlights.length;
        });
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isViewerOpen, careerHighlights.length]);

  return (
    <section
      id="career"
      className="overflow-hidden bg-[#0b0b0b] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="02"
          label="The Art & The Journey"
          title="A Career in Motion"
          description="Explore the performances, creative vision, and cinematic world surrounding Aaron Pierre."
        />

        {/* Cinematic Introduction */}
        <div className="relative mt-16 overflow-hidden border border-white/10 bg-[#151515] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C5A46D]/10 blur-[100px]" />

          <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D8BD8A]">
                The Creative Journey
              </span>

              <h3 className="mt-6 max-w-3xl text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Every role.
                <br />
                <span className="text-[#D8BD8A]">A new dimension.</span>
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                From powerful screen performances to the details behind the
                craft, explore a visual collection inspired by the evolving
                career of Aaron Pierre.
              </p>
            </div>

            <div className="hidden border-l border-[#C5A46D]/40 pl-6 md:block">
              <p className="text-4xl font-light text-[#D8BD8A]">AP</p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/40">
                Selected Work
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Image Collection */}
        <div className="mt-8 grid auto-rows-[320px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-3">
          {careerHighlights.map((item, index) => (
            <article
              key={item.number}
              className={`group relative isolate overflow-hidden border border-white/10 bg-[#171717] ${
                item.size === "large" ? "lg:col-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${item.title} image`}
                className="absolute inset-0 z-0 h-full w-full cursor-zoom-in"
              >
                {!failedImages.includes(item.image) ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={() => markImageAsFailed(item.image)}
                    className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#252019] to-[#090909]">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D8BD8A]/70">
                      Aaron Pierre · {item.number}
                    </span>
                  </div>
                )}
              </button>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5 transition duration-500 group-hover:from-black/95 group-hover:via-black/45" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C5A46D]/10 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute left-0 top-0 z-10 h-[2px] w-0 bg-[#D8BD8A] transition-all duration-700 group-hover:w-full" />

              <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#E0C895]">
                    {item.number} / {item.category}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-lg text-white transition duration-500 group-hover:border-[#D8BD8A] group-hover:bg-[#D8BD8A] group-hover:text-black">
                    ↗
                  </span>
                </div>

                <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="mb-4 h-px w-10 bg-[#D8BD8A] transition-all duration-500 group-hover:w-20" />

                  <h3 className="max-w-lg text-2xl font-light leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-xs leading-6 text-white/65 sm:text-sm">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    onClick={(event) => event.stopPropagation()}
                    className="pointer-events-auto mt-6 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#E0C895] transition hover:text-white"
                  >
                    {item.linkLabel}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-20 border-t border-white/10 pt-10 sm:mt-28 sm:pt-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A46D]">
            The Journey Continues
          </span>

          <p className="mt-6 max-w-4xl text-2xl font-light leading-relaxed text-white/70 sm:text-4xl sm:leading-relaxed">
            Great performances stay with us long after the screen fades to
            black.
            <span className="text-[#D8BD8A]">
              {" "}
              The next chapter is always waiting.
            </span>
          </p>
        </div>
      </div>

      {/* Full-Screen Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#050505] p-4 backdrop-blur-md sm:p-8"
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label="Career image viewer"
        >
          <button
            type="button"
            onClick={closeViewer}
            aria-label="Close image viewer"
            className="fixed right-4 top-4 z-[10001] flex h-12 w-12 items-center justify-center border border-white/30 bg-black text-3xl text-white transition hover:border-[#D8BD8A] hover:text-[#D8BD8A] sm:right-8 sm:top-8"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
            className="fixed left-2 top-1/2 z-[10001] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/80 text-3xl text-white transition hover:border-[#D8BD8A] hover:text-[#D8BD8A] sm:left-6 sm:h-14 sm:w-14"
          >
            ‹
          </button>

          <div
            className="my-auto w-full max-w-6xl py-16"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-[35vh] items-center justify-center">
              {!failedImages.includes(selectedImage.image) ? (
                <img
                  key={selectedImage.image}
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  onError={() => markImageAsFailed(selectedImage.image)}
                  className="mx-auto max-h-[65vh] w-full object-contain sm:max-h-[72vh]"
                />
              ) : (
                <div className="flex min-h-[35vh] w-full flex-col items-center justify-center border border-white/10 bg-gradient-to-br from-[#211d16] to-[#080808] px-6 text-center">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D8BD8A]">
                    {selectedImage.category}
                  </span>

                  <p className="mt-4 text-2xl font-light text-white sm:text-4xl">
                    {selectedImage.title}
                  </p>

                  <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                    This image could not be loaded from its online source.
                    Please check your internet connection or replace the image
                    URL.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-white/15 pt-5 sm:mt-8 sm:pt-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#D8BD8A] sm:text-[10px]">
                    {selectedImage.number} / {selectedImage.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-light text-white sm:text-3xl">
                    {selectedImage.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-xs leading-6 text-white/60 sm:text-sm">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap text-[10px] tracking-[0.15em] text-white/50">
                    {selectedIndex + 1} / {careerHighlights.length}
                  </span>

                  <a
                    href={selectedImage.link}
                    onClick={closeViewer}
                    className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-[#D8BD8A] transition hover:text-white"
                  >
                    {selectedImage.linkLabel} →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
            className="fixed right-2 top-1/2 z-[10001] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/80 text-3xl text-white transition hover:border-[#D8BD8A] hover:text-[#D8BD8A] sm:right-6 sm:h-14 sm:w-14"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Career;
