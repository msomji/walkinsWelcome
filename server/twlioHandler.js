const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;


module.exports.getTwilioVideoToken = (event, context, callback) => {
    // Create Video Grant
    const videoGrant = new VideoGrant({
        room: 'cool room',
    });

    // containing the grant we just created
    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_VIDEO_API_KEY, process.env.TWILIO_VIDEO_API_SECRET);
    token.addGrant(videoGrant);
    console.log(event)

    token.identity = event.queryStringParameters.identity;

    // console.log(token.toJwt());
    callback(null, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }, { body: JSON.stringify({ token: token.toJwt() }) });

}


module.exports.sendTwilioWhatsAppText = (event, context, callback) => {
    const client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID, 
        process.env.TWILIO_WHATSAPP_API_AUTH_TOKEN);

    client.messages
        .create({
            body: 'join video on https://www.google.com/',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+16148937476'
        })
        .then(message => callback(null, headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },{ body: "OK" }))
        .done();

}