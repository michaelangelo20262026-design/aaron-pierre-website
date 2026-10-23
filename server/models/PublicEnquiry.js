const mongoose = require("mongoose");

const publicEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      default: "General Enquiry",
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    reply: {
      type: String,
      default: "",
      trim: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PublicEnquiry", publicEnquirySchema);
