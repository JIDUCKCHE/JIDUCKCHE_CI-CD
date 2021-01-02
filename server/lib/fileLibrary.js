const aws = require('aws-sdk');
const config = require('../config/key');
const s3 = new aws.S3();
s3.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    signatureVersion: 'v4',
    region: 'ap-northeast-2'
})

function getURL(file, type, next) {
    const fileName = file
    const params = {
        Bucket: config.Bucket,
        Key: `current/${type}Image/` + fileName,
        Expires: 3000,
        ContentType: 'image/jpeg'
    }
    s3.getSignedUrl('putObject', params, function(err, signedURL) {
        if(err) {
            return next(err, null)
        } else {
            return next(null, {
                postURL: signedURL,
                getURL: signedURL.split("?")[0],
                filename: fileName
            })
        }
    })
}

function moveToTrash(fileName, type, next) {
    const params = {
        Bucket: config.Bucket,
        CopySource: encodeURI(`jiduckchae-dev/current/${type}Image/${fileName}`),
        Key: `trash/${type}Image/${Date.now()}-${fileName}`
    }
    s3.copyObject(params, function(err, data) { if(err) return next(err) })
    
    const params2 = {
        Bucket: config.Bucket,
        Key: `current/${type}Image/${fileName}`
    }
    s3.deleteObject(params2, (err, data) => { if(err) return next(err) })
}

module.exports = {
    getURL,
    moveToTrash
}