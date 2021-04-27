const aws = require('aws-sdk')
const multer = require('multer')

const { awsConfig } = require('../config')

exports.s3 = new aws.S3(awsConfig)

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  }
})

exports.uploader = multer({ storage }).single('file')