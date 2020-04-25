const mongoose = require('mongoose');
const Promise = require('bluebird');
const validator = require('validator');
const RoomModel = require('./model/room.js');

mongoose.Promise = Promise;
const mongoString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139844.mlab.com:39844/walkins-welcome`; // MongoDB Url

const dbExecute = (db, fn) => db.then(fn).finally(() => mongoose.connection.close());

dbConnectAndExecute =(dbUrl, fn) => dbExecute(mongoose.connect(dbUrl), fn);

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

module.exports.roomById = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel 
      .find({ _id: event.pathParameters.id })
      .then(patient => callback(null, { statusCode: 200, body: JSON.stringify(patient) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.createRoom = (event, context, callback) => {
    console.log(JSON.parse(event.body))
    const {hostId, phoneNumber, description, spciality,location, languages} = JSON.parse(event.body);
    const room = new RoomModel({hostId, phoneNumber, description, spciality,location, languages});
  
    if (room.validateSync()) {
      callback(null, createErrorResponse(400, 'Incorrect room data'));
      return;
    }
    dbConnectAndExecute(mongoString, () => (
      room
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: room.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ));
  }
module.exports.roomBylanguage = (event, context, callback) => {
    console.log(event.pathParameters)
  if (undefined === event.pathParameters.language) {
    callback(null, createErrorResponse(400, 'must provide language'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel 
      .find({ languages: event.pathParameters.language })
      .then(rooms => callback(null, { statusCode: 200, body: JSON.stringify(rooms)}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.roomByHost = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel 
      .find({ hostId: event.pathParameters.id })
      .then(rooms => callback(null, { statusCode: 200, body: JSON.stringify(rooms) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.deleteRoom = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel
      .remove({ _id: event.pathParameters.id })
      .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};