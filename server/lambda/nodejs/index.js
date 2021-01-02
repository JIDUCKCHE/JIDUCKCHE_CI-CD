const aws = require('aws-sdk');
const moment = require('moment');

exports.handler = async (event) => {
    // TODO implement
    const s3 = new aws.S3();
    s3.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        signatureVersion: 'v4',
        region: 'ap-northeast-2'
    })
    const params = {
        Bucket: process.env.Bucket,
        Prefix: 'trash/'
    }
    s3.listObjects(params, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            data['Contents'].forEach(function(item) {
                if(item['Size'] > 0) {
                    if(moment().diff(moment(item['LastModified']),'days') >= 30) {
                        const params2 = {
                            Bucket: process.env.Bucket,
                            Key: item.Key
                        }
                        s3.deleteObject(params2, (err, data) => {
                            if(err) {
                                console.log(err)
                            } else {
                                console.log(data)
                            }
                        })
                    }
                }
            })
        }
    })
};
