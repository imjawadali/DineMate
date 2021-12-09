const AWS = require('aws-sdk');
require('dotenv').config();

exports.sendTextMessage = async function (PhoneNumber, Message, successCallback, failureCallback) {
    console.log("sendTextMessage", PhoneNumber + " - " + Message)
    new AWS.SNS({ apiVersion: "2010-03-31" })
        .publish({ PhoneNumber, Message })
        .promise()
        .then(response => {
            console.log(response)
            if (!!successCallback) {
                successCallback()
            }
        })
        .catch(error => {
            console.log(error)
            if (!!failureCallback) {
                failureCallback(error.message)
            }
        })
}