import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";

const galleryImages = [
  {
    number: "01",
    category: "PORTRAITS",
    title: "The Portrait",
    description: "A close-up portrait capturing Aaron Pierre's presence.",
    image:
      "https://static.time.com/v3/assets/bltea6093859af6183b/blt0b8c76e3dcfcd4b8/698a5b8c16d8840d52c3f26f/time100-next-2024-aaron-pierre.jpg?auto=webp&branch=production&crop=4%3A5&quality=75&width=1200",
    creditUrl:
      "https://time.com/collections/time100-next-2024/7023632/aaron-pierre/",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    number: "02",
    category: "STYLE",
    title: "Louis Vuitton",
    description: "Aaron Pierre in a refined, contemporary look.",
    image:
      "https://media.gq-magazine.co.uk/photos/609e84187c4de40838d62788/master/w_1280%2Cc_limit/150432021_GQStyle_03.jpg",
    creditUrl:
      "https://www.gq-magazine.co.uk/article/real-life-diet-aaron-pierre",
    size: "",
  },
  {
    number: "03",
    category: "PORTRAITS",
    title: "Quiet Confidence",
    description: "A striking studio portrait with understated styling.",
    image:
      "https://imgix.bustle.com/uploads/image/2021/7/19/bcc8e1bd-6f00-42c0-9b90-a6159488900c-6b10061a-512e-46d0-be5d-fa1f963897bd-210218-aaron-pierre-s01-020-copy.jpeg?fit=crop&fm=jpg&w=1200",
    creditUrl:
      "https://www.wmagazine.com/culture/aaron-pierre-old-underground-railroad-interview",
    size: "",
  },
  {
    number: "04",
    category: "PORTRAITS",
    title: "The Editorial Series",
    description: "An intimate editorial portrait of Aaron Pierre.",
    image:
      "https://www.euphoriazine.com/wp-content/uploads/2021/06/Aaron-Pierre--scaled.jpg",
    creditUrl:
      "https://www.euphoriazine.com/blog/2021/06/entertainment-aaron-pierre/",
    size: "md:col-span-2",
  },
  {
    number: "05",
    category: "REBEL RIDGE",
    title: "Terry Richmond",
    description: "Aaron Pierre in his leading role in Rebel Ridge.",
    image:
      "https://s.yimg.com/ny/api/res/1.2/A2M5Iqwu9LHpVkqaqWcQ7w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https%3A/media.zenfs.com/en/the_hollywood_reporter_217/9a6aaf5f5d490a2c6e06c13fcc7be1e3",
    creditUrl:
      "https://www.netflix.com/tudum/articles/rebel-ridge-release-date-photos-news",
    size: "",
  },
  {
    number: "06",
    category: "REBEL RIDGE",
    title: "A Moment of Tension",
    description: "A cinematic moment from the Netflix thriller.",
    image:
      "https://cdn.mos.cms.futurecdn.net/h3x3D3kGk5nLS3yJLuVTiQ-1200-80.jpg",
    creditUrl:
      "https://www.netflix.com/tudum/articles/rebel-ridge-release-date-photos-news",
    size: "",
  },
  {
    number: "07",
    category: "THE UNDERGROUND RAILROAD",
    title: "Caesar",
    description: "Aaron Pierre as Caesar in The Underground Railroad.",
    image:
      "https://imgix.bustle.com/uploads/image/2021/5/13/edd59b4a-781c-45f0-b6e7-252009984eef-ugrr_s1_unit_102_1545r_thumb.jpeg?fit=crop&fm=jpg&w=1200",
    creditUrl:
      "https://www.bustle.com/entertainment/who-plays-caesar-underground-railroad-aaron-pierre",
    size: "md:col-span-2",
  },
  {
    number: "08",
    category: "REBEL RIDGE",
    title: "The Leading Man",
    description: "A dramatic still featuring Aaron Pierre as Terry Richmond.",
    image:
      "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/60566/square_thumb%403x.jpg",
    creditUrl:
      "https://www.backstage.com/magazine/article/aaron-pierre-rebel-ridge-interview-78846/",
    size: "",
  },
  {
    number: "09",
    category: "STYLE",
    title: "The Premiere Look",
    description: "A tailored look at a major film premiere.",
    image:
      "https://kotaku.com/app/uploads/2025/01/98fb1f7f37af5cf67032f4dbaec6ff0a.jpg",
    creditUrl:
      "https://kotaku.com/some-fans-are-calling-for-rebel-ridge-s-aaron-pierre-to-1851737676",
    size: "",
  },
  {
    number: "10",
    category: "PORTRAITS",
    title: "The GQ Portrait",
    description: "A studio portrait with classic menswear styling.",
    image:
      "https://media.gq-magazine.co.uk/photos/609e845472e426530a83d0d1/1%3A1/w_640%2Cc_limit/150432021_GQStyle_HP_03.jpg",
    creditUrl:
      "https://www.gq-magazine.co.uk/article/real-life-diet-aaron-pierre",
    size: "md:col-span-2",
  },
  {
    number: "11",
    category: "THE UNDERGROUND RAILROAD",
    title: "A Period Character",
    description: "Aaron Pierre in costume as Caesar.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/aaron-pierre-ur-1620749058.jpg",
    creditUrl:
      "https://www.townandcountrymag.com/leisure/arts-and-culture/g36396556/underground-railroad-cast-real-life-photos/",
    size: "",
  },
  {
    number: "12",
    category: "REBEL RIDGE",
    title: "The Action Thriller",
    description: "A dramatic image from Aaron Pierre's Netflix film.",
    image:
      "https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQdI1VRcahttuSqck_d8ZhuP6Ypzw13zlhz7e2MgFxujj400H80jVOlLnBmsSu9xadmeCACbqFvOktByK3nnqffLUQw2fusHDl1EeDe-g-mxNpTIzb4IceGcASa7dFB7Z_N2_VvJ8uMBipDWv-PQOdzk4.jpg?r=244",
    creditUrl:
      "https://www.netflix.com/tudum/articles/rebel-ridge-release-date-photos-news",
    size: "",
  },
  {
    number: "13",
    category: "PORTRAITS",
    title: "A Warm Expression",
    description: "A relaxed portrait highlighting Aaron Pierre's smile.",
    image:
      "https://media.zenfs.com/en/the_huffington_post_584/a51a4d495daed62490a7ff53a2e148cf",
    creditUrl:
      "https://ca.news.yahoo.com/aaron-pierre-responds-viral-spirit-222648772.html",
    size: "",
  },
  {
    number: "14",
    category: "STYLE",
    title: "Modern Elegance",
    description: "A polished look from Aaron Pierre's fashion appearances.",
    image:
      "https://media.gq-magazine.co.uk/photos/609e84187c4de40838d62788/master/w_1280%2Cc_limit/150432021_GQStyle_03.jpg",
    creditUrl:
      "https://www.gq-magazine.co.uk/article/real-life-diet-aaron-pierre",
    size: "md:col-span-2",
  },
  {
    number: "15",
    category: "REBEL RIDGE",
    title: "Terry's World",
    description: "A tense moment from the film Rebel Ridge.",
    image:
      "https://cdn.mos.cms.futurecdn.net/h3x3D3kGk5nLS3yJLuVTiQ-1200-80.jpg",
    creditUrl:
      "https://www.netflix.com/tudum/articles/rebel-ridge-release-date-photos-news",
    size: "",
  },
  {
    number: "16",
    category: "THE UNDERGROUND RAILROAD",
    title: "Caesar's Journey",
    description: "A scene from the historical drama.",
    image: "https://ychef.files.bbci.co.uk/976x549/p09glps2.jpg",
    creditUrl:
      "https://www.bbc.com/culture/article/20210504-the-underground-railroad-review-a-remarkable-american-epic",
    size: "",
  },
  {
    number: "17",
    category: "PORTRAITS",
    title: "The Camera's Focus",
    description: "A close-up editorial portrait.",
    image:
      "https://imgix.bustle.com/uploads/image/2021/7/19/bcc8e1bd-6f00-42c0-9b90-a6159488900c-6b10061a-512e-46d0-be5d-fa1f963897bd-210218-aaron-pierre-s01-020-copy.jpeg?fit=crop&fm=jpg&w=1200",
    creditUrl:
      "https://www.wmagazine.com/culture/aaron-pierre-old-underground-railroad-interview",
    size: "",
  },
  {
    number: "18",
    category: "STYLE",
    title: "The Fashion Portrait",
    description: "A contemporary fashion portrait of Aaron Pierre.",
    image:
      "https://kotaku.com/app/uploads/2025/01/98fb1f7f37af5cf67032f4dbaec6ff0a.jpg",
    creditUrl:
      "https://kotaku.com/some-fans-are-calling-for-rebel-ridge-s-aaron-pierre-to-1851737676",
    size: "",
  },
  {
    number: "19",
    category: "PORTRAITS",
    title: "The Thoughtful Look",
    description: "A quieter portrait showcasing his screen presence.",
    image:
      "https://static.time.com/v3/assets/bltea6093859af6183b/blt0b8c76e3dcfcd4b8/698a5b8c16d8840d52c3f26f/time100-next-2024-aaron-pierre.jpg?auto=webp&branch=production&crop=4%3A5&quality=75&width=1200",
    creditUrl:
      "https://time.com/collections/time100-next-2024/7023632/aaron-pierre/",
    size: "md:col-span-2",
  },
  {
    number: "20",
    category: "THE UNDERGROUND RAILROAD",
    title: "The Character",
    description: "Aaron Pierre brings Caesar to life on screen.",
    image:
      "https://imgix.bustle.com/uploads/image/2021/5/13/edd59b4a-781c-45f0-b6e7-252009984eef-ugrr_s1_unit_102_1545r_thumb.jpeg?fit=crop&fm=jpg&w=1200",
    creditUrl:
      "https://www.bustle.com/entertainment/who-plays-caesar-underground-railroad-aaron-pierre",
    size: "",
  },
];

const filters = [
  "ALL",
  "PORTRAITS",
  "REBEL RIDGE",
  "THE UNDERGROUND RAILROAD",
  "STYLE",
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [failedImages, setFailedImages] = useState({});

  const filteredImages =
    activeFilter === "ALL"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeFilter);

  const selectedItem =
    selectedImage === null ? null : filteredImages[selectedImage];

  const showPreviousImage = () => {
    setSelectedImage((current) =>
      current === null
        ? null
        : (current - 1 + filteredImages.length) % filteredImages.length,
    );
  };

  const showNextImage = () => {
    setSelectedImage((current) =>
      current === null ? null : (current + 1) % filteredImages.length,
    );
  };

  useEffect(() => {
    if (selectedImage === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, activeFilter]);

  const renderImage = (item, index, className = "") => {
    const imageKey = item.number;

    return failedImages[imageKey] ? (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#29251F] via-[#151515] to-[#090909] ${className}`}
      >
        <span className="text-6xl font-light tracking-[-0.08em] text-[#D8BD8A]/25">
          AP
        </span>
      </div>
    ) : (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onError={() =>
          setFailedImages((previous) => ({
            ...previous,
            [imageKey]: true,
          }))
        }
        className={`object-cover transition duration-700 group-hover:scale-105 ${className}`}
      />
    );
  };

  return (
    <section
      id="gallery"
      className="border-b border-white/[0.08] px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="03"
          label="Visual Archive"
          title="The many sides of Aaron Pierre"
          description="Cinematic moments, striking portraits, and defining appearances."
        />

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-7 text-white/45">
            From memorable screen performances to editorial portraits, explore a
            visual collection celebrating Aaron Pierre.
          </p>

          <span className="text-[9px] uppercase tracking-[0.25em] text-[#D8BD8A]">
            {filteredImages.length} images in view
          </span>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setSelectedImage(null);
              }}
              className={`border px-4 py-3 text-[9px] uppercase tracking-[0.16em] transition ${
                activeFilter === filter
                  ? "border-[#C5A46D] bg-[#C5A46D] text-black"
                  : "border-white/15 text-white/55 hover:border-[#C5A46D] hover:text-[#D8BD8A]"
              }`}
            >
              {filter === "ALL" ? "All images" : filter}
            </button>
          ))}
        </div>

        {/* Cinematic Gallery Grid */}
        <div className="mt-8 grid auto-rows-[280px] gap-4 sm:grid-cols-2 sm:auto-rows-[320px] lg:grid-cols-4 lg:auto-rows-[280px]">
          {filteredImages.map((item, index) => (
            <article
              key={item.number}
              className={`group relative isolate overflow-hidden border border-white/[0.08] bg-[#101010] ${item.size}`}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`View image: ${item.title}`}
                className="absolute inset-0 z-0 flex h-full w-full cursor-zoom-in flex-col text-left"
              >
                <div className="absolute inset-0">
                  {renderImage(item, index, "h-full w-full object-cover")}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 transition duration-500 group-hover:opacity-100" />

                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-lg text-[#D8BD8A] backdrop-blur-sm transition group-hover:border-[#C5A46D] group-hover:bg-[#C5A46D] group-hover:text-black">
                  ↗
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.2em] text-[#D8BD8A]">
                      {item.number}
                    </span>

                    <span className="h-px w-6 bg-[#C5A46D]/60" />

                    <span className="text-[8px] uppercase tracking-[0.15em] text-white/70">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-light tracking-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-xs leading-6 text-white/60">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-block text-[9px] uppercase tracking-[0.16em] text-[#D8BD8A]">
                    View photograph
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
            Film · Portraiture · Fashion
          </p>

          <a
            href="/contact"
            className="inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/55 transition hover:text-[#D8BD8A]"
          >
            Media and press enquiries
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Image Viewer */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/50 text-3xl text-white transition hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-black"
          >
            ×
          </button>

          <div className="absolute left-5 top-7 text-[10px] uppercase tracking-[0.2em] text-[#D8BD8A] sm:left-8">
            {String(selectedImage + 1).padStart(2, "0")} /{" "}
            {String(filteredImages.length).padStart(2, "0")}
          </div>

          <button
            type="button"
            onClick={showPreviousImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-2xl text-white transition hover:border-[#C5A46D] hover:text-[#D8BD8A] sm:left-8 sm:h-14 sm:w-14"
          >
            ‹
          </button>

          <div className="flex max-h-full w-full max-w-6xl flex-col items-center justify-center">
            {failedImages[selectedItem.number] ? (
              <div className="flex h-[50vh] w-full items-center justify-center bg-gradient-to-br from-[#29251F] via-[#151515] to-[#090909]">
                <span className="text-8xl font-light tracking-[-0.08em] text-[#D8BD8A]/30">
                  AP
                </span>
              </div>
            ) : (
              <img
                key={selectedItem.number}
                src={selectedItem.image}
                alt={selectedItem.title}
                onError={() =>
                  setFailedImages((previous) => ({
                    ...previous,
                    [selectedItem.number]: true,
                  }))
                }
                className="max-h-[65vh] max-w-full object-contain sm:max-h-[72vh]"
              />
            )}

            <div className="mt-5 w-full max-w-3xl border-t border-white/10 pt-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#D8BD8A]">
                    {selectedItem.category}
                  </p>

                  <h3 className="mt-2 text-xl font-light text-white sm:text-2xl">
                    {selectedItem.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-white/55">
                    {selectedItem.description}
                  </p>
                </div>

                <a
                  href={selectedItem.creditUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-[9px] uppercase tracking-[0.12em] text-white/45 underline underline-offset-4 transition hover:text-[#D8BD8A]"
                >
                  Photo source ↗
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={showNextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-2xl text-white transition hover:border-[#C5A46D] hover:text-[#D8BD8A] sm:right-8 sm:h-14 sm:w-14"
          >
            ›
          </button>

          <p className="absolute bottom-3 text-center text-[9px] uppercase tracking-[0.14em] text-white/30">
            Use ← → to browse · Esc to close
          </p>
        </div>
      )}
    </section>
  );
}

export default Gallery;
