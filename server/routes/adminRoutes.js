const express = require("express");
const jwt = require("jsonwebtoken");
const Fan = require("../models/Fan");
const Message = require("../models/Message");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin login
router.post("/login", function (req, res) {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({
        message: "Admin login has not been configured.",
      });
    }

    if (
      !email ||
      !password ||
      email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() ||
      password !== adminPassword
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    return res.status(200).json({
      message: "Admin login successful!",
      token: token,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      message: "Unable to complete admin login.",
    });
  }
});

// Get unread message counts for Aaron's Inbox and Management Inbox
// Get unread message counts for Aaron's Inbox, Management Inbox, and each fan
router.get(
  "/messages/unread-counts",
  adminMiddleware,
  async function (req, res) {
    try {
      // Get total unread counts for Aaron and Management
      const unreadCounts = await Message.aggregate([
        {
          $match: {
            sender: "fan",
            read: false,
          },
        },
        {
          $group: {
            _id: "$recipient",
            count: { $sum: 1 },
          },
        },
      ]);

      const counts = {
        aaron: 0,
        management: 0,
      };

      unreadCounts.forEach(function (item) {
        counts[item._id] = item.count;
      });

      // Get unread message counts for each individual fan
      const perFanCounts = await Message.aggregate([
        {
          $match: {
            sender: "fan",
            recipient: "aaron",
            read: false,
          },
        },
        {
          $group: {
            _id: "$fan",
            count: { $sum: 1 },
          },
        },
      ]);

      const fanCounts = perFanCounts.map(function (item) {
        return {
          fanId: String(item._id),
          count: item.count,
        };
      });

      return res.status(200).json({
        message: "Unread message counts retrieved successfully.",
        counts: counts,
        fanCounts: fanCounts,
      });
    } catch (error) {
      console.error("Get unread message counts error:", error.message);

      return res.status(500).json({
        message: "Unable to retrieve unread message counts.",
      });
    }
  },
);
// Get all registered fans
router.get("/fans", adminMiddleware, async function (req, res) {
  try {
    const fans = await Fan.find().select("-pinHash").sort({ createdAt: -1 });

    return res.status(200).json(
      fans.map(function (fan) {
        return {
          id: fan._id,
          displayName: fan.displayName,
          email: fan.email,
          profilePicture: fan.profilePicture,
          membershipTier: fan.membershipTier,
          createdAt: fan.createdAt,
        };
      }),
    );
  } catch (error) {
    console.error("Get registered fans error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve registered fans.",
    });
  }
});
router.get("/inbox-fans", adminMiddleware, async function (req, res) {
  try {
    const { recipient } = req.query;

    if (!["aaron", "management"].includes(recipient)) {
      return res.status(400).json({
        message: "Recipient must be aaron or management.",
      });
    }

    const fanIds = await Message.distinct("fan", {
      recipient: recipient,
    });

    const fans = await Fan.find({
      _id: { $in: fanIds },
    })
      .select("-pinHash")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      fans.map(function (fan) {
        return {
          id: fan._id,
          displayName: fan.displayName,
          email: fan.email,
          profilePicture: fan.profilePicture,
          membershipTier: fan.membershipTier,
          createdAt: fan.createdAt,
        };
      }),
    );
  } catch (error) {
    console.error("Get inbox fans error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve inbox conversations.",
    });
  }
});

// Update a fan's membership tier
router.patch(
  "/fans/:fanId/membership",
  adminMiddleware,
  async function (req, res) {
    try {
      const { membershipTier } = req.body;

      if (!["Fan", "VIP", "Gold"].includes(membershipTier)) {
        return res.status(400).json({
          message: "Membership tier must be Fan, VIP, or Gold.",
        });
      }

      const fan = await Fan.findById(req.params.fanId);

      if (!fan) {
        return res.status(404).json({
          message: "Fan account not found.",
        });
      }

      fan.membershipTier = membershipTier;

      await fan.save();

      return res.status(200).json({
        message: "Membership tier updated successfully.",
        fan: {
          id: fan._id,
          displayName: fan.displayName,
          email: fan.email,
          membershipTier: fan.membershipTier,
        },
      });
    } catch (error) {
      console.error("Update membership tier error:", error.message);

      return res.status(500).json({
        message: "Unable to update membership tier.",
      });
    }
  },
);

// Get a fan's conversation for Aaron or Management
router.get("/messages/:fanId", adminMiddleware, async function (req, res) {
  try {
    const { recipient } = req.query;

    if (!["aaron", "management"].includes(recipient)) {
      return res.status(400).json({
        message: "Recipient must be aaron or management.",
      });
    }

    const fan = await Fan.findById(req.params.fanId).select("-pinHash");

    if (!fan) {
      return res.status(404).json({
        message: "Fan account not found.",
      });
    }

    await Message.updateMany(
      {
        fan: fan._id,
        recipient: recipient,
        sender: "fan",
        read: false,
      },
      {
        $set: { read: true },
      },
    );

    const messages = await Message.find({
      fan: fan._id,
      recipient: recipient,
    }).sort({ createdAt: 1 });
    return res.status(200).json({
      message: "Fan conversation retrieved successfully!",
      fan: {
        id: fan._id,
        displayName: fan.displayName,
        email: fan.email,
        profilePicture: fan.profilePicture,
        membershipTier: fan.membershipTier,
      },
      messages: messages.map(function (message) {
        return {
          id: message._id,
          sender: message.sender,
          recipient: message.recipient,
          text: message.text,
          image: message.image,
          imageName: message.imageName,
          time: message.createdAt,
          read: message.read,
        };
      }),
    });
  } catch (error) {
    console.error("Get fan conversation error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve the fan conversation.",
    });
  }
});

// Reply to a fan from Aaron or Management
router.post("/messages/:fanId", adminMiddleware, async function (req, res) {
  try {
    const { sender, text, image, imageName } = req.body;

    if (!["aaron", "management"].includes(sender)) {
      return res.status(400).json({
        message: "Sender must be aaron or management.",
      });
    }

    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "Please enter a message or attach an image.",
      });
    }

    const fan = await Fan.findById(req.params.fanId);

    if (!fan) {
      return res.status(404).json({
        message: "Fan account not found.",
      });
    }

    const message = await Message.create({
      fan: fan._id,
      sender: sender,
      recipient: sender,
      text: text || "",
      image: image || "",
      imageName: imageName || "",
    });

    return res.status(201).json({
      message: "Reply sent successfully!",
      data: {
        id: message._id,
        sender: message.sender,
        recipient: message.recipient,
        text: message.text,
        image: message.image,
        imageName: message.imageName,
        time: message.createdAt,
        read: message.read,
      },
    });
  } catch (error) {
    console.error("Admin reply error:", error.message);

    return res.status(500).json({
      message: "Unable to send the reply.",
    });
  }
});

console.log(
  "Membership route registered:",
  router.stack.some(function (layer) {
    return (
      layer.route &&
      layer.route.path === "/fans/:fanId/membership" &&
      layer.route.methods.patch
    );
  }),
);
module.exports = router;
