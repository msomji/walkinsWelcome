const mongoose = require('mongoose');
const Promise = require('bluebird');
const validator = require('validator');
const PatientModel = require('./model/patient.js');

mongoose.Promise = Promise;
const mongoString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139844.mlab.com:39844/walkins-welcome`; // MongoDB Url

const dbExecute = (db, fn) => db.then(fn).finally(() => mongoose.connection.close());

dbConnectAndExecute =(dbUrl, fn) => dbExecute(mongoose.connect(dbUrl), fn);

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,

},
  body: message || 'Incorrect id',
});

module.exports.patientsById = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    PatientModel 
      .find({ _id: event.pathParameters.id })
      .then(patient => callback(null, { statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },body: JSON.stringify(patient) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.patientsByRoomId = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    PatientModel 
      .find({ roomId: event.pathParameters.id })
      .sort({ createdTime: 'asc' })
      .then(patients => callback(null, { statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },body: JSON.stringify(patients) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.createPatient = (event, context, callback) => {
  const {name, phoneNumber, roomId, description} = JSON.parse(event.body);
  console.log('creating patient')
  console.log(JSON.parse(event.body))
  const patient = new PatientModel({name, phoneNumber, roomId, description, createdTime: Date.now()});

  if (patient.validateSync()) {
    callback(null, createErrorResponse(400, 'Incorrect Patient data'));
    return;
  }
  dbConnectAndExecute(mongoString, () => (
    patient
      .save()
      .then(() => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ id: patient.id }),
      }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
}

module.exports.deletePatient = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    PatientModel
      .remove({ _id: event.pathParameters.id })
      .then(() => callback(null, { statusCode: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },body: JSON.stringify('Ok') }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};