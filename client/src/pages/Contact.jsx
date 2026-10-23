import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const enquiryTypes = [
    "Booking / Appearance",
    "Business Partnership",
    "Press / Media",
    "Other Professional Enquiry",
  ];

  function handleSubmit(event) {
    event.preventDefault();

    // The management submission service will be connected later.
    // Do not display a false success message before that integration exists.
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#101010] px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      {/* Ambient Gold Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C5A46D]/[0.04] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <SectionHeading
          number="04"
          label="Get in Touch"
          title="Let's start a conversation"
          description="For professional opportunities, collaborations, appearances, and media enquiries, please contact the management team."
        />

        {/* Contact Content */}
        <div className="mt-16 grid gap-12 border-t border-white/[0.08] pt-10 lg:grid-cols-[1fr_0.8fr] lg:gap-24 lg:pt-16">
          {/* Left: Management Enquiries */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D8BD8A]">
              Management &amp; Representation
            </p>

            <h3 className="mt-6 max-w-2xl text-3xl font-light leading-tight tracking-[-0.04em] sm:text-5xl sm:leading-tight">
              For opportunities that move the story forward.
            </h3>

            <p className="mt-7 max-w-xl text-sm leading-8 text-white/50">
              For bookings, brand partnerships, professional collaborations, and
              press enquiries, please share the details of your request with the
              management team. We welcome enquiries from individuals,
              organisations, and brands interested in exploring professional
              opportunities.
            </p>

            {/* Enquiry Categories */}
            <div className="mt-10 border-t border-white/[0.08]">
              {enquiryTypes.map((type, index) => (
                <div
                  key={type}
                  className="flex items-center gap-5 border-b border-white/[0.08] py-5"
                >
                  <span className="text-[10px] tracking-[0.15em] text-[#C5A46D]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-white/65">{type}</span>

                  <span aria-hidden="true" className="ml-auto text-white/25">
                    ↗
                  </span>
                </div>
              ))}
            </div>

            {/* Professional Enquiry Note */}
            <div className="mt-8 flex items-start gap-4">
              <span aria-hidden="true" className="mt-1 text-[#C5A46D]">
                ✦
              </span>

              <p className="max-w-lg text-xs leading-7 text-white/40">
                For the most helpful response, please include the purpose of
                your enquiry, relevant dates, and any important details about
                your proposal.
              </p>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="border border-white/[0.1] bg-[#090909] p-6 sm:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D8BD8A]">
                  Professional Enquiries
                </p>

                <h3 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
                  Contact management
                </h3>
              </div>

              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C5A46D]/40 text-lg text-[#D8BD8A]"
              >
                ↗
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/45">
              Please complete the form below with your contact details and
              enquiry. Providing clear information will help the management team
              understand your request.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/50"
                >
                  Full Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full border border-white/[0.12] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/70"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/50"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="w-full border border-white/[0.12] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/70"
                />
              </div>

              {/* Organisation */}
              <div>
                <label
                  htmlFor="contact-organisation"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/50"
                >
                  Organisation
                  <span className="ml-2 normal-case tracking-normal text-white/30">
                    (Optional)
                  </span>
                </label>

                <input
                  id="contact-organisation"
                  name="organisation"
                  type="text"
                  placeholder="Company or organisation name"
                  autoComplete="organization"
                  className="w-full border border-white/[0.12] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/70"
                />
              </div>

              {/* Enquiry Type */}
              <div>
                <label
                  htmlFor="contact-type"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/50"
                >
                  Enquiry Type
                </label>

                <select
                  id="contact-type"
                  name="enquiryType"
                  defaultValue=""
                  required
                  className="w-full border border-white/[0.12] bg-[#101010] px-4 py-4 text-sm text-white/70 outline-none transition focus:border-[#C5A46D]/70"
                >
                  <option value="" disabled>
                    Select an enquiry type
                  </option>

                  {enquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/50"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your enquiry..."
                  required
                  className="w-full resize-y border border-white/[0.12] bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/70"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Submit Enquiry
                <span aria-hidden="true">→</span>
              </Button>

              {/* Reserved for a genuine submission status message */}
              {formSubmitted && (
                <p role="status" className="text-sm leading-6 text-[#D8BD8A]">
                  Thank you for your enquiry.
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-[10px] leading-6 text-white/30">
              All professional enquiries are intended for management review.
            </p>
          </div>
        </div>

        {/* Fan Community Invitation */}
        <div className="mt-20 border border-[#C5A46D]/20 bg-[#C5A46D]/[0.035] p-7 sm:mt-28 sm:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D8BD8A]">
                For the Fans
              </p>

              <h3 className="mt-5 text-3xl font-light tracking-[-0.04em] sm:text-4xl">
                A place for the community.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/50">
                Discover the fan community, explore the Fan, VIP, and Gold
                membership options, and join a community celebrating Aaron
                Pierre's work.
              </p>
            </div>

            <Button href="#fan-community" className="shrink-0">
              Explore the fan community
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
