import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

function FanCommunity() {
  const memberships = [
    {
      name: "Fan",
      number: "01",
      price: "$100",
      description:
        "A place to begin your journey as a supporter of Aaron Pierre's work.",
      badge: "FAN",
      featured: false,
      benefits: [
        "Personal fan profile",
        "Community access",
        "News and updates",
        "Fan membership badge",
      ],
    },
    {
      name: "VIP",
      number: "02",
      price: "$500",
      description:
        "For supporters looking for a more elevated community experience.",
      badge: "VIP",
      featured: true,
      benefits: [
        "Everything in Fan",
        "Distinctive VIP profile badge",
        "Enhanced community experience",
        "Access to eligible VIP features",
      ],
    },
    {
      name: "Gold",
      number: "03",
      price: "$1,000",
      description: "A premium membership concept for dedicated supporters.",
      badge: "GOLD",
      featured: false,
      benefits: [
        "Everything in VIP",
        "Exclusive Gold profile badge",
        "Access to eligible premium features",
        "A distinguished membership profile",
      ],
    },
  ];

  return (
    <section
      id="fan-community"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#090909] px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      {/* Ambient Gold Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#C5A46D]/[0.05] blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <SectionHeading
          number="05"
          label="The Fan Community"
          title="More than a moment"
          description="A community for people who appreciate the performances, characters, and stories that make Aaron Pierre's work memorable."
        />

        {/* Introduction */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.08] pt-7 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-sm leading-8 text-white/50 sm:text-base">
            Find your place in the community. Explore the membership levels and
            discover the experience being developed for supporters.
          </p>

          <span className="w-fit border border-[#C5A46D]/30 px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#D8BD8A]">
            Three membership levels
          </span>
        </div>

        {/* Membership Cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {memberships.map((membership) => (
            <article
              key={membership.number}
              className={`group relative flex flex-col border p-7 transition duration-300 hover:-translate-y-1 sm:p-9 ${
                membership.featured
                  ? "border-[#C5A46D]/60 bg-[#C5A46D]/[0.06] lg:-translate-y-2 lg:hover:-translate-y-3"
                  : "border-white/[0.1] bg-[#101010] hover:border-[#C5A46D]/40"
              }`}
            >
              {/* Featured Label */}
              {membership.featured && (
                <span className="absolute right-5 top-5 border border-[#C5A46D]/40 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-[#D8BD8A]">
                  VIP Selection
                </span>
              )}

              {/* Membership Number */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.2em] text-[#C5A46D]">
                  {membership.number}
                </span>

                <span className="h-px w-8 bg-[#C5A46D]/40" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Membership
                </span>
              </div>

              {/* Membership Badge */}
              <div className="mt-12 flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center border ${
                    membership.name === "Gold"
                      ? "border-[#D8BD8A]/60 bg-[#C5A46D]/10 text-[#D8BD8A]"
                      : membership.name === "VIP"
                        ? "border-[#C5A46D]/50 bg-white/[0.03] text-[#D8BD8A]"
                        : "border-white/20 bg-white/[0.03] text-white/70"
                  }`}
                >
                  <span className="text-xs font-medium tracking-[0.12em]">
                    {membership.badge}
                  </span>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                    Membership tier
                  </p>

                  <h3 className="mt-2 text-3xl font-light tracking-[-0.04em]">
                    {membership.name}
                  </h3>
                </div>
              </div>

              {/* Membership Price — Added */}
              <div className="mt-7 border-t border-white/[0.08] pt-5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Membership Price
                </p>

                <p className="mt-2 text-3xl font-light tracking-tight text-[#D8BD8A]">
                  {membership.price}
                  <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    USD
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="mt-7 min-h-[72px] text-sm leading-7 text-white/50">
                {membership.description}
              </p>

              {/* Benefits */}
              <div className="mt-8 border-t border-white/[0.08] pt-7">
                <p className="mb-6 text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Membership Highlights
                </p>

                <ul className="space-y-5">
                  {membership.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-white/65"
                    >
                      <span aria-hidden="true" className="mt-1 text-[#C5A46D]">
                        ✓
                      </span>

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Membership Enquiry */}
              <div className="mt-10 border-t border-white/[0.08] pt-7">
                <Button
                  href="#membership-enquiries"
                  className={`w-full ${
                    membership.featured
                      ? ""
                      : "border border-[#C5A46D]/40 bg-transparent text-[#D8BD8A] hover:bg-[#C5A46D] hover:text-black"
                  }`}
                >
                  Explore {membership.name}
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Membership Enquiry Information */}
        <div
          id="membership-enquiries"
          className="mt-16 border border-white/[0.1] bg-[#101010] p-7 sm:mt-24 sm:p-10"
        >
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#D8BD8A]">
                Membership Information
              </p>

              <h3 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
                Find the membership that suits you.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/50">
                For membership availability, pricing, benefits, and payment
                enquiries, please contact management. Membership details will be
                confirmed before any purchase is made.
              </p>
            </div>

            <Button href="/management" className="shrink-0">
              Contact Management
              <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>

        {/* Community Note */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-6 text-white/35">
            Membership status and benefits are subject to confirmation. Official
            membership upgrades will be handled through management.
          </p>

          <a
            href="#home"
            className="flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/45 transition hover:text-[#D8BD8A]"
          >
            Back to the beginning
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FanCommunity;
