import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://aaron-pierre-backend.vercel.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("adminToken", data.token);

      navigate("/admin");
    } catch (error) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1020] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C5A46D]/40 bg-[#C5A46D]/10 text-2xl font-bold text-[#D8BD8A]">
            AP
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C5A46D]">
            Executive Control Room
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Admin Portal
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to manage fan accounts, conversations, memberships, and
            website content.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12192B] p-6 shadow-2xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-semibold">Welcome back</h2>

            <p className="mt-2 text-sm text-slate-400">
              Enter your administrator credentials to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Administrator Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your admin email"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#C5A46D]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your admin password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#C5A46D]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#C5A46D] px-4 py-3 font-semibold text-[#0B1020] transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <p className="text-xs leading-5 text-slate-500">
              Restricted access. Authorized administrators only.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Aaron Pierre · Private Administration
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
