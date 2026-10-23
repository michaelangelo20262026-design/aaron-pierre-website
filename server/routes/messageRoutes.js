const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send a message to Aaron or Management
router.post("/", authMiddleware, async function (req, res) {
  try {
    const { recipient, text, image, imageName } = req.body;

    if (!["aaron", "management"].includes(recipient)) {
      return res.status(400).json({
        message: "Recipient must be aaron or management.",
      });
    }

    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "Please enter a message or attach an image.",
      });
    }

    const message = await Message.create({
      fan: req.fanId,
      sender: "fan",
      recipient: recipient,
      text: text || "",
      image: image || "",
      imageName: imageName || "",
    });

    return res.status(201).json({
      message: "Message sent successfully!",
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
    console.error("Send message error:", error.message);

    return res.status(500).json({
      message: "Unable to send your message.",
    });
  }
});

// Get the logged-in fan's conversation with Aaron or Management
router.get("/", authMiddleware, async function (req, res) {
  try {
    const recipient = req.query.recipient || "aaron";

    if (!["aaron", "management"].includes(recipient)) {
      return res.status(400).json({
        message: "Recipient must be aaron or management.",
      });
    }

    await Message.updateMany(
      {
        fan: req.fanId,
        sender: "aaron",
        recipient: "aaron",
        read: false,
      },
      {
        $set: { read: true },
      },
    );
    const messages = await Message.find({
      fan: req.fanId,
      $or: [
        { recipient: recipient, sender: "fan" },
        { sender: "aaron", recipient: "aaron" },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
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
    console.error("Get messages error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve your messages.",
    });
  }
});

// Get the number of unread replies from Aaron
router.get("/unread-count", authMiddleware, async function (req, res) {
  try {
    const count = await Message.countDocuments({
      fan: req.fanId,
      sender: "aaron",
      recipient: "aaron",
      read: false,
    });

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Unread message count error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve unread message count.",
    });
  }
});

module.exports = router;
