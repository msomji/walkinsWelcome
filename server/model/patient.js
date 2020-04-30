const mongoose = require('mongoose');
const validator = require('validator');

const PatientModel = mongoose.model('Patient', {
  name: {
    type: String,
    required: true,
    validate: {
      validator(name) {
        return name.split(' ').every(s => validator.isAlpha(s));
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
  createdTime: {
    type: Number,
    required: true,
  },
}, "Patients");

module.exports = PatientModel;
