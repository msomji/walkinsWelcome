const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const mongoose = require('mongoose');
var TinyURL = require('tinyurl');

const validator = require('validator');
const PatientModel = require('./model/patient.js');

mongoose.Promise = Promise;

const mongoString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139844.mlab.com:39844/walkins-welcome`; // MongoDB Url

const dbExecute = (db, fn) => db.then(fn).finally(() => mongoose.connection.close());

dbConnectAndExecute = (dbUrl, fn) => dbExecute(mongoose.connect(dbUrl), fn);

const createErrorResponse = (statusCode, message) => ({
    statusCode: statusCode || 501,
    headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,

    },
    body: message || 'Incorrect id',
});

module.exports.getTwilioVideoTokenForRoomAndWithNameForPatient = (event, context, callback) => {
    let roomId = event.pathParameters.roomId;
    dbConnectAndExecute(mongoString, () => (
        PatientModel
            .find({ roomId: roomId })
            .sort({ createdTime: 'asc' })
            .then(patients => {
                if (patients.length !== 0) {
                    let name = patients[0].name
                    console.log("THAT PATIENT")
                    console.log(patients[0])
                    const videoGrant = new VideoGrant({ room: roomId });
                    // containing the grant we just created
                    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_VIDEO_API_KEY, process.env.TWILIO_VIDEO_API_SECRET);
                    token.addGrant(videoGrant);
                    token.identity = name;
                    let jwtToken = token.toJwt();
                    console.log(process.env.CLIENT_URL + "/videoCall?token=" + jwtToken)

                    TinyURL.shorten(process.env.CLIENT_URL + "/videoCall?token=" + jwtToken, function (tinyRes, tinyError) {
                        // if (tinyError)
                        //     console.log(tinyError)
                        const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_MESSAGING_AUTH_TOKEN);
                        client.messages
                        .create({
                            body: "Your Doctor is ready to see you, click on this link to join the video call: " + tinyRes,
                            from: process.env.TWILIO_PHONE_NUMBER,
                            messagingServiceSid: process.env.TWILIO_MESSEGING_SID_KEY,
                            to: patients[0].phoneNumber
                        })
                        .then(message => {
                            console.log(message.sid)
                            callback(null, {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Credentials': true,
                                }, body: "OK"
                            })
                        })
                        .done();
                    });
                } else {

                    callback(null, createErrorResponse(400, 'No PAtients In Line'));
                }

            })
            .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ));

}
module.exports.getTwilioVideoTokenForRoomAndWithName = (event, context, callback) => {
    let roomId = event.pathParameters.roomId;
    let name = event.pathParameters.name;

    const videoGrant = new VideoGrant({
        room: roomId,
    });

    // containing the grant we just created
    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_VIDEO_API_KEY, process.env.TWILIO_VIDEO_API_SECRET);
    token.addGrant(videoGrant);
    console.log(event)

    token.identity = name;

    // console.log(token.toJwt());
    callback(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify({ token: token.toJwt() })
    });

}
module.exports.getTwilioVideoToken = (event, context, callback) => {
    // Create Video Grant
    const videoGrant = new VideoGrant({
        room: 'room-name',
    });

    // containing the grant we just created
    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_VIDEO_API_KEY, process.env.TWILIO_VIDEO_API_SECRET);
    token.addGrant(videoGrant);
    console.log(event)

    token.identity = event.queryStringParameters.identity;

    // console.log(token.toJwt());
    callback(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify({ token: token.toJwt() })
    });

}


module.exports.sendTwilioWhatsAppText = (event, context, callback) => {
    const client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_WHATSAPP_API_AUTH_TOKEN);

    client.messages
        .create({
            body: 'join video on https://www.google.com/',
            from: '+14157047887',
            to: '+16148947476'
        })
        .then(message => callback(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            }, body: "OK"
        }))
        .done();

}