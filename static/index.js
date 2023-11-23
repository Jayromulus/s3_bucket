const imgForm = document.querySelector('.imgForm');

imgForm.addEventListener('submit', async(e) => {
	e.preventDefault();
	const file = e.target[0].files[0];
	console.log(file)

	// fetch to server to gfet link from s3
	const url = await fetch('/geturl').then(res => res.json());
	console.log(url);
	// fetch to s3 to upload image
	await fetch(url, {
		method: "PUT",
		headers: new Headers({
			"Content-Type": "multipart/form-data"
		}),
		body: file
	})
	// fetch to our server to post link
	const imgURL = url.split('?')[0]

	console.log(imgURL);

	const img = document.createElement('img');
	img.src = imgURL;
	document.body.appendChild(img);
});
