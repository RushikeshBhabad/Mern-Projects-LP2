const Registration = require("../models/Registration");
const Event = require("../models/Event");

// @desc    Register for an event
// @route   POST /api/registrations
const createRegistration = async (req, res, next) => {
  try {
    const { participantName, email, phoneNumber, eventId } = req.body;

    // Verify event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const registration = await Registration.create({
      participantName,
      email,
      phoneNumber,
      eventId,
    });

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations for a specific event
// @route   GET /api/registrations/event/:eventId
const getRegistrationsByEvent = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRegistration,
  getRegistrationsByEvent,
};
