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
  hostName: {
    type: String,
    required: true,
    validate: {
      validator(hostName) {
        return hostName.split(' ').every(s => validator.isAlpha(s));
      },
    },
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
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
