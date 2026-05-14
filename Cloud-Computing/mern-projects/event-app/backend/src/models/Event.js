const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
    },
    organizer: {
      type: String,
      required: [true, "Organizer name is required"],
    },
    fee: {
      type: Number,
      required: [true, "Registration fee is required (can be 0 for free)"],
      min: 0,
    },
    imageUrl: {
      type: String,
      required: [true, "Event image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
