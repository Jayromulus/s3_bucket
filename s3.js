const aws = require('aws-sdk');
const crypto = require('crypto');

const region = process.env.REGION;
const bucketName = process.env.BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// connect to the s3 bucket using the user key and secret from AWS user management
const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4'
});

// generate a function that will upload a file
async function uploadURL() {
	// create random bytes translated into a hex for a new unique name of the image that will be stored
	const rawBytes = await crypto.randomBytes(16);
	const imgName = rawBytes.toString("hex");
	
	const params = {
		Bucket: bucketName,
		Key: imgName,
		Expires: 20
	}

	return await s3.getSignedUrlPromise('putObject', params);
}

module.exports = uploadURL;
