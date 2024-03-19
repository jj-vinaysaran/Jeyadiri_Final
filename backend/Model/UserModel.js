const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fathername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatheroccupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherstatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mothername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motherage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motheroccupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motherstatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeaddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumberfather: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumbermother: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whoami: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedSchoolState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedSchoolDistrict: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
