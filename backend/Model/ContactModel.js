// models/Contact.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Contact = db.define('Contact', {
  contactId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

module.exports = Contact;
