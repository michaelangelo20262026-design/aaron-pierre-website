const express = require("express");
const PublicEnquiry = require("../models/PublicEnquiry");

const router = express.Router();

// Submit a public Management enquiry
router.post("/", async function (req, res) {
  try {
    const { name, email, category, text } = req.body;

    if (!name?.trim() || !email?.trim() || !text?.trim()) {
      return res.status(400).json({
        message: "Please provide your name, email, and message.",
      });
    }

    const enquiry = await PublicEnquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      category: category || "General Enquiry",
      text: text.trim(),
    });

    return res.status(201).json({
      message: "Your enquiry has been sent successfully!",
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        category: enquiry.category,
        text: enquiry.text,
        time: enquiry.createdAt,
        read: enquiry.read,
      },
    });
  } catch (error) {
    console.error("Submit public enquiry error:", error.message);

    return res.status(500).json({
      message: "Unable to send your enquiry. Please try again.",
    });
  }
});

module.exports = router;
