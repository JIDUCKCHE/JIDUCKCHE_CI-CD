const aws = require("aws-sdk");
const moment = require("moment");

const s3 = new aws.S3({ apiVersion: "2006-03-01" });
s3.config.update({
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
	signatureVersion: "v4",
	region: "ap-northeast-2",
});

exports.handler = async (event) => {
	// TODO implement
	try {
		const params = {
			Bucket: "jiduckchae-dev",
			Prefix: "trash/",
		};
		const result = await s3.listObjectsV2(params).promise();
		await result.Contents.forEach(async function (item) {
			if (
				item.Size > 0 &&
				moment().diff(moment(item.LastModified), "days") >= 30
			) {
				const params2 = {
					Bucket: "jiduckchae-dev",
					Key: item.Key,
				};
				console.log(params2);
				const data = await s3.deleteObject(params2).promise();
				console.log(data);
			}
		});
		//     console.log(err);
		//     if(err) {
		//         console.log('err1: ' + err);
		//     } else {
		//         data['Contents'].forEach(function(item) {
		//             if(item['Size'] > 0) {
		//                 if(moment().diff(moment(item['LastModified']),'days') >= 1) {
		//                     const params2 = {
		//                         Bucket: process.env.Bucket,
		//                         Key: item.Key
		//                     };
		//                     s3.deleteObject(params2, (err, data) => {
		//                         if(err) {
		//                             console.log('err2: ' + err);
		//                         } else {
		//                             console.log('data: ' + data);
		//                         }
		//                     });
		//                 }
		//             }
		//         });
		//         console.log('data2: ' + data);
		//     }
		// });
	} catch (error) {
		console.log(error);
		return error;
	}
};
