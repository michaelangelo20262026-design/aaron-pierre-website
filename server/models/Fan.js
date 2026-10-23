const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    pinHash: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    membershipTier: {
      type: String,
      enum: ["Fan", "VIP", "Gold"],
      default: "Fan",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Fan", fanSchema);
