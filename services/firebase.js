var FCM = require('fcm-node');

var serverKey = process.env.FIREBASE_SERVER_KEY;
var fcm = new FCM(serverKey);

exports.sendNotification = async function (message, successCallback) {
    console.log("message", message)
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
			console.log("Respponse:! ", response);
        } else {
            console.log("Successfully sent with response: ", response);
            if (!!successCallback) {
                successCallback()
            }
        }
    });
}