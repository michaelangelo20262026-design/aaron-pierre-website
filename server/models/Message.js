const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    fan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fan",
      required: true,
    },

    sender: {
      type: String,
      enum: ["fan", "aaron", "management"],
      required: true,
    },

    recipient: {
      type: String,
      enum: ["aaron", "management"],
      required: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    imageName: {
      type: String,
      default: "",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Message", messageSchema);
