// models/Event.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Event = db.define('EventTable', {
  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  eventTiming: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  candistribute: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NO',
  },
});

module.exports = Event;
