import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FanRegister() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef(null);

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");
    setProfilePicture(null);

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      setProfilePicture({
        name: file.name,
        url: reader.result,
      });
    };

    reader.onerror = function () {
      setImageError("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  }

  function removeProfilePicture() {
    setProfilePicture(null);
    setImageError("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (!displayName.trim()) {
      setFormError("Please enter your display name.");
      return;
    }

    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!/^[0-9]{4}$/.test(pin)) {
      setFormError("Your PIN must contain exactly four digits.");
      return;
    }

    if (pin !== confirmPin) {
      setFormError("Your PINs do not match. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/fans/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: displayName.trim(),
          email: email.trim(),
          pin: pin,
          confirmPin: confirmPin,
          profilePicture: profilePicture ? profilePicture.url : "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Unable to create your account.");
        return;
      }

      setSuccessMessage("Your account was created successfully!");

      navigate("/fan-login");
    } catch (error) {
      setFormError(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-white/[0.08] bg-[#090909] px-4 py-20 sm:px-8 lg:px-16 lg:py-28">
      {/* Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#C5A46D]/[0.06] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Page Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#D8BD8A]">
            <span className="h-px w-8 bg-[#C5A46D]" />
            Official Fan Community
            <span className="h-px w-8 bg-[#C5A46D]" />
          </p>

          <h1 className="mt-6 text-4xl font-light tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Create Your <span className="text-[#D8BD8A]">Account.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            Join the fan community and create your private account to begin
            conversations with Aaron Pierre.
          </p>
        </div>

        {/* Registration Form */}
        <div className="mx-auto max-w-2xl border border-white/[0.1] bg-[#0D0D0D]">
          {/* Form Header */}
          <div className="border-b border-white/[0.08] p-6 sm:p-8">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#D8BD8A]">
              Fan Registration
            </p>

            <h2 className="mt-3 text-2xl font-light">Your Personal Profile</h2>

            <p className="mt-3 text-xs leading-6 text-white/40">
              Enter your details below to prepare your fan account.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-7 p-6 sm:p-8">
            {/* Profile Picture */}
            <div>
              <label className="mb-4 block text-[9px] uppercase tracking-[0.2em] text-white/45">
                Profile Picture
              </label>

              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C5A46D]/40 bg-[#141414]">
                  {profilePicture ? (
                    <img
                      src={profilePicture.url}
                      alt="Your profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs tracking-widest text-[#D8BD8A]">
                      PHOTO
                    </span>
                  )}
                </div>

                <div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    aria-label="Choose your profile picture"
                  />

                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="border border-[#C5A46D]/50 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-[#D8BD8A] transition hover:bg-[#C5A46D]/10"
                  >
                    Choose Photo
                  </button>

                  <p className="mt-3 text-[10px] leading-5 text-white/30">
                    JPG, PNG, or another supported image format. Maximum 5 MB.
                  </p>

                  {profilePicture && (
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className="mt-2 text-[10px] uppercase tracking-wider text-red-300 transition hover:text-red-200"
                    >
                      Remove Photo
                    </button>
                  )}

                  {imageError && (
                    <p role="alert" className="mt-2 text-xs text-red-300">
                      {imageError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label
                htmlFor="fan-display-name"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Display Name
              </label>

              <input
                id="fan-display-name"
                type="text"
                autoComplete="nickname"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Enter your display name"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="fan-email"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Email Address
              </label>

              <input
                id="fan-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />

              <p className="mt-2 text-[10px] leading-5 text-white/30">
                Use an email address you can access.
              </p>
            </div>

            {/* Create PIN */}
            <div>
              <label
                htmlFor="fan-pin"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Create Your 4-Digit PIN
              </label>

              <input
                id="fan-pin"
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                pattern="[0-9]{4}"
                maxLength={4}
                value={pin}
                onChange={(event) =>
                  setPin(event.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="Enter 4 digits"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm tracking-[0.4em] text-white outline-none transition placeholder:tracking-normal placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />

              <p className="mt-2 text-[10px] leading-5 text-white/30">
                Choose a PIN you can remember. Additional security protections
                will be implemented with the backend.
              </p>
            </div>

            {/* Confirm PIN */}
            <div>
              <label
                htmlFor="fan-confirm-pin"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Confirm Your PIN
              </label>

              <input
                id="fan-confirm-pin"
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                pattern="[0-9]{4}"
                maxLength={4}
                value={confirmPin}
                onChange={(event) =>
                  setConfirmPin(event.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="Re-enter your 4-digit PIN"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm tracking-[0.4em] text-white outline-none transition placeholder:tracking-normal placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />
            </div>

            {/* Form Error */}
            {formError && (
              <p
                role="alert"
                className="border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-xs leading-6 text-red-300"
              >
                {formError}
              </p>
            )}

            {/* Success Message */}
            {successMessage && (
              <p
                role="status"
                className="border border-[#C5A46D]/25 bg-[#C5A46D]/[0.05] px-4 py-3 text-xs leading-6 text-[#D8BD8A]"
              >
                {successMessage}
              </p>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#C5A46D] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Fan Account"}
              {!isLoading && <span aria-hidden="true">↗</span>}
            </button>

            {/* Login Link */}
            <div className="border-t border-white/[0.08] pt-6 text-center">
              <p className="text-xs text-white/40">Already have an account?</p>

              <Link
                to="/fan-login"
                className="mt-3 inline-block text-[10px] uppercase tracking-[0.18em] text-[#D8BD8A] transition hover:text-white"
              >
                Log In to Your Account
              </Link>
            </div>
          </form>
        </div>

        {/* Privacy Note */}
        <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3">
          <span aria-hidden="true" className="mt-1 text-[#D8BD8A]">
            🔒
          </span>

          <p className="text-[10px] leading-6 text-white/30">
            Your fan account is intended for private communication with Aaron
            Pierre. Account storage, secure PIN handling, and login
            functionality will be connected when we build the backend.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FanRegister;
