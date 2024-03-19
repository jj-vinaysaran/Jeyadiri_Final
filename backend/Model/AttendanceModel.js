const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./UserModel'); // Correct import path

const Attendance = db.define('Attendance', {
  attendanceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Attendance.belongsTo(User, { foreignKey: 'userId' }); // Define the correct association

module.exports = Attendance;
