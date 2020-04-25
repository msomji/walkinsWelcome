const mongoose = require('mongoose');
const validator = require('validator');

const RoomModel = mongoose.model('Room', {
  hostId: {
    type: String,
    required: true,
    validate: {
      validator(hostId) {
        return validator.isAlphanumeric(hostId);
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
  description: {
    type: String,
    // required: true,
  },
  speciality: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  languages: {
    type: [String],
    required: true,
    validate: {
      validator(languages) {
        return !languages.map(l => validator.isAlpha(l)).includes(false)
      },
    },
  },
}, "Rooms");

module.exports = RoomModel;
