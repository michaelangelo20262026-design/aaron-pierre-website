const express = require("express");
const bcrypt = require("bcryptjs");
const Fan = require("../models/Fan");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new fan
router.post("/register", async function (req, res) {
  try {
    const { displayName, email, pin, confirmPin, profilePicture } = req.body;

    // Check that the required fields are provided
    if (!displayName || !email || !pin || !confirmPin) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    // Check that the PIN contains exactly four digits
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({
        message: "Your PIN must contain exactly four digits.",
      });
    }

    // Check that both PIN entries match
    if (pin !== confirmPin) {
      return res.status(400).json({
        message: "Your PINs do not match.",
      });
    }

    // Check that the display name is not empty
    if (!displayName.trim()) {
      return res.status(400).json({
        message: "Please enter your display name.",
      });
    }

    // Check the email format
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Check whether this email is already registered
    const existingFan = await Fan.findOne({
      email: normalizedEmail,
    });

    if (existingFan) {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    // Hash the PIN before saving it
    const pinHash = await bcrypt.hash(pin, 12);

    // Create the fan account
    const fan = await Fan.create({
      displayName: displayName.trim(),
      email: normalizedEmail,
      pinHash: pinHash,
      profilePicture: profilePicture || "",
    });

    // Send a successful response without exposing the PIN hash
    return res.status(201).json({
      message: "Your fan account has been created successfully!",
      fan: {
        id: fan._id,
        displayName: fan.displayName,
        email: fan.email,
        profilePicture: fan.profilePicture,
        membershipTier: fan.membershipTier,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    console.error("Fan registration error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while creating your account.",
    });
  }
});

// Log in an existing fan
router.post("/login", async function (req, res) {
  try {
    const { email, pin } = req.body;

    // Check that the required fields are provided
    if (!email || !pin) {
      return res.status(400).json({
        message: "Please enter your email and PIN.",
      });
    }

    // Find the fan using their email address
    const fan = await Fan.findOne({
      email: email.trim().toLowerCase(),
    });

    // Check whether the fan exists
    if (!fan) {
      return res.status(401).json({
        message: "Invalid email or PIN.",
      });
    }

    // Compare the entered PIN with the stored PIN hash
    const isPinCorrect = await bcrypt.compare(pin, fan.pinHash);

    if (!isPinCorrect) {
      return res.status(401).json({
        message: "Invalid email or PIN.",
      });
    }
    const token = jwt.sign({ fanId: fan._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return the fan's public account details
    return res.status(200).json({
      message: "Login successful!",
      token: token,
      fan: {
        id: fan._id,
        displayName: fan.displayName,
        email: fan.email,
        profilePicture: fan.profilePicture,
        membershipTier: fan.membershipTier,
      },
    });
  } catch (error) {
    console.error("Fan login error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
});

// Get the logged-in fan's profile
router.get("/profile", authMiddleware, async function (req, res) {
  try {
    const fan = await Fan.findById(req.fanId).select("-pinHash");

    if (!fan) {
      return res.status(404).json({
        message: "Fan account not found.",
      });
    }

    return res.status(200).json({
      message: "Fan profile retrieved successfully!",
      fan: {
        id: fan._id,
        displayName: fan.displayName,
        email: fan.email,
        profilePicture: fan.profilePicture,
        membershipTier: fan.membershipTier,
      },
    });
  } catch (error) {
    console.error("Fan profile error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while retrieving the fan profile.",
    });
  }
});
// Update the logged-in fan's profile picture
router.patch("/profile", authMiddleware, async function (req, res) {
  try {
    const { profilePicture } = req.body;

    if (typeof profilePicture !== "string") {
      return res.status(400).json({
        message: "Please provide a valid profile picture.",
      });
    }

    const fan = await Fan.findById(req.fanId);

    if (!fan) {
      return res.status(404).json({
        message: "Fan account not found.",
      });
    }

    fan.profilePicture = profilePicture;

    await fan.save();

    return res.status(200).json({
      message: "Profile picture updated successfully!",
      fan: {
        id: fan._id,
        displayName: fan.displayName,
        email: fan.email,
        profilePicture: fan.profilePicture,
        membershipTier: fan.membershipTier,
      },
    });
  } catch (error) {
    console.error("Update fan profile error:", error.message);

    return res.status(500).json({
      message: "Unable to update your profile picture.",
    });
  }
});
module.exports = router;
