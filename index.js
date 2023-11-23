require('dotenv').config();
const express = require('express');
const app = express();

const { HOST, PORT } = process.env;

const uploadURL = require('./s3');
// uploadURL();

app.use(express.static('./static'));

app.get('/geturl', async(req, res) => {
	const url = await uploadURL();
	res.status(200).json(url);
});

app.listen(PORT, HOST, () => console.log(`[server] listening on ${HOST}${PORT}`));

// to use this bucket change the "aws-learning-bucket-jf" back to public access and it will work
