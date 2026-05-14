const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    participantName: {
      type: String,
      required: [true, "Participant name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
