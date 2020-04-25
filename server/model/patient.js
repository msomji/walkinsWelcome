const mongoose = require('mongoose');
const validator = require('validator');

const PatientModel = mongoose.model('Patient', {
  name: {
    type: String,
    required: true,
    validate: {
      validator(name) {
        return validator.isAlpha(name);
      },
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator(phoneNumber) {
        return validator.isMobilePhone(phoneNumber);
      },
    },
  },
  roomId: {
    type: String,
    required: true,
    validate: {
      validator(roomId) {
        return validator.isAlphanumeric(roomId);
      },
    },
  },
  description: {
    type: String,
    // required: true,
  },
}, "Patients");

module.exports = PatientModel;
