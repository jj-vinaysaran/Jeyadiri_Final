const express = require("express");
const { createEvent, getAllEvents } = require("../Controller/eventController"); // Corrected import path
const router = express.Router();

router.get("/allevents", getAllEvents);
router.post("/createevent", createEvent); // Corrected function name

module.exports = router;
