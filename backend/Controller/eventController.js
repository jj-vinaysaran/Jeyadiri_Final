// Controllers/eventController.js
const Event = require('../Model/EventsModel');

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await Event.create(eventData);
    res.status(201).json({ message: 'Event created successfully', eventId: event.eventId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
