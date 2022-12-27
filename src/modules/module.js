const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.POSTIMG,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `slides/${Date.now()}_${file.originalname}`);
        },
    }),
});

module.exports = upload;