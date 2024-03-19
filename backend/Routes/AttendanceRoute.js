const express = require('express');
const router = express.Router();
const attendanceController = require('../Controller/AttendanceController'); // Adjust the path based on your project structure
const { route } = require('./user');

// Define your routes using the attendanceController functions
router.get('/allattendance', attendanceController.allAttendance);
router.post('/createattendance', attendanceController.createAttendance);
router.put('/updateattendance/:attendanceId', attendanceController.updateAttendance);
router.delete('/deleteattendance/:attendanceId', attendanceController.deleteAttendance);
router.post('/myattendance', attendanceController.findMyAttendance);
router.get("/attendance/event/:eventId", attendanceController.attendanceForEvent); 
module.exports = router;
