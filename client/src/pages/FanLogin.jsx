import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FanLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!/^[0-9]{4}$/.test(pin)) {
      setFormError("Your PIN must contain exactly four digits.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://aaron-pierre-backend.vercel.app/api/fans/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          pin: pin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Incorrect email or PIN.");
        return;
      }

      localStorage.setItem("fanLoggedIn", "true");
      localStorage.setItem("fanToken", data.token);
      localStorage.setItem("fanAccount", JSON.stringify(data.fan));

      setSuccessMessage("Login successful!");

      navigate("/fan-chat");
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
        className="pointer-events-none absolute right-0 top-20 h-[350px] w-[350px] rounded-full bg-[#C5A46D]/[0.06] blur-[120px]"
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
            Welcome <span className="text-[#D8BD8A]">Back.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            Sign in to your fan account to continue your private conversation
            with Aaron Pierre.
          </p>
        </div>

        {/* Login Form */}
        <div className="mx-auto max-w-2xl border border-white/[0.1] bg-[#0D0D0D]">
          {/* Form Header */}
          <div className="border-b border-white/[0.08] p-6 sm:p-8">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#D8BD8A]">
              Fan Login
            </p>

            <h2 className="mt-3 text-2xl font-light">Access Your Account</h2>

            <p className="mt-3 text-xs leading-6 text-white/40">
              Enter the email address and PIN associated with your fan account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7 p-6 sm:p-8">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />
            </div>

            {/* PIN */}
            <div>
              <label
                htmlFor="login-pin"
                className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/45"
              >
                Your 4-Digit PIN
              </label>

              <input
                id="login-pin"
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                pattern="[0-9]{4}"
                maxLength={4}
                value={pin}
                onChange={(event) =>
                  setPin(event.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="Enter your PIN"
                className="w-full border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm tracking-[0.4em] text-white outline-none transition placeholder:tracking-normal placeholder:text-white/25 focus:border-[#C5A46D]/60"
                required
              />

              <p className="mt-2 text-[10px] leading-5 text-white/30">
                Enter the four-digit PIN you chose when registering.
              </p>
            </div>

            {/* Error Message */}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#C5A46D] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging In..." : "Log In"}
              {!isLoading && <span aria-hidden="true">↗</span>}
            </button>

            {/* Registration Link */}
            <div className="border-t border-white/[0.08] pt-6 text-center">
              <p className="text-xs text-white/40">
                Don't have a fan account yet?
              </p>

              <Link
                to="/fan-register"
                className="mt-3 inline-block text-[10px] uppercase tracking-[0.18em] text-[#D8BD8A] transition hover:text-white"
              >
                Create Fan Account
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
            Your email and PIN are verified by our backend before you can access
            your fan account and private conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FanLogin;
