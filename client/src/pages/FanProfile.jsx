import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function FanProfile() {
  const [fan, setFan] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const imageInputRef = useRef(null);

  useEffect(function () {
    async function loadProfile() {
      const token = localStorage.getItem("fanToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/fans/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setImageError(data.message || "Unable to load your profile.");
          return;
        }

        setFan(data.fan);
      } catch (error) {
        setImageError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (localStorage.getItem("fanLoggedIn") !== "true") {
    return <Navigate to="/fan-login" replace />;
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");
    setSuccessMessage("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Your image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      setSelectedImage(reader.result);
    };

    reader.onerror = function () {
      setImageError("Unable to read this image.");
    };

    reader.readAsDataURL(file);
  }

  async function handleSavePicture() {
    if (!selectedImage) {
      setImageError("Please choose a new profile picture first.");
      return;
    }

    const token = localStorage.getItem("fanToken");

    if (!token) {
      setImageError("Your session has expired. Please log in again.");
      return;
    }

    setSaving(true);
    setImageError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/fans/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profilePicture: selectedImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setImageError(data.message || "Unable to update your picture.");
        return;
      }

      setFan(data.fan);
      setSelectedImage("");
      setSuccessMessage("Your profile picture has been updated!");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      setImageError("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#090909] px-6 py-20 text-center text-[#D8BD8A]">
        Loading your profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-[#C5A46D]">
          Fan Community
        </p>

        <h1 className="mb-3 text-center text-3xl font-semibold sm:text-4xl">
          My Profile
        </h1>

        <p className="mb-10 text-center text-sm text-gray-400">
          Manage your account and profile picture.
        </p>

        {fan && (
          <section className="rounded-2xl border border-[#C5A46D]/25 bg-white/[0.03] p-6 sm:p-10">
            <div className="mb-8 flex flex-col items-center">
              <img
                src={
                  selectedImage ||
                  fan.profilePicture ||
                  "https://placehold.co/160x160/151515/C5A46D?text=Profile"
                }
                alt="Fan profile"
                className="mb-5 h-32 w-32 rounded-full border-2 border-[#C5A46D] object-cover"
              />

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="rounded-full border border-[#C5A46D] px-5 py-2 text-sm text-[#D8BD8A] transition hover:bg-[#C5A46D]/10"
              >
                Choose New Picture
              </button>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              <p className="mt-3 text-xs text-gray-500">
                Maximum image size: 5 MB
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                  Display Name
                </p>
                <p className="break-words">{fan.displayName}</p>
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                  Email Address
                </p>
                <p className="break-words">{fan.email}</p>
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                  Membership
                </p>
                <p className="text-[#D8BD8A]">{fan.membershipTier || "Fan"}</p>
              </div>
            </div>

            {imageError && (
              <p className="mt-6 text-sm text-red-400">{imageError}</p>
            )}

            {successMessage && (
              <p className="mt-6 text-sm text-green-400">{successMessage}</p>
            )}

            {selectedImage && (
              <button
                type="button"
                onClick={handleSavePicture}
                disabled={saving}
                className="mt-8 w-full rounded-full bg-[#C5A46D] px-6 py-3 font-semibold text-black transition hover:bg-[#D8BD8A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving Picture..." : "Save Profile Picture"}
              </button>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default FanProfile;
