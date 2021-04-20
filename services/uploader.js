// const aws = require('aws-sdk')
const multer = require('multer')
// const multerS3 = require('multer-s3')

const { awsConfig } = require('../config')

// aws.config.update(awsConfig)

// const s3 = new aws.S3({ /* ... */ })
 
// exports.uploader = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'some-bucket',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  }
})

exports.uploader = multer({ storage }).single('file')