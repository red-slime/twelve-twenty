import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function ImageUpload() {
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		const storageRef = ref(storage, `images/${image.name}`);
		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setUrl(downloadURL);
				});
			}
		);
	};

	return (
		<div>
			<progress value={progress} max="100" />
			<br />
			<input type="file" onChange={handleChange} />
			<button onClick={handleUpload}>Upload</button>
			<br />
			{url}
			<img
				src={url || "http://via.placeholder.com/300"}
				alt="Uploaded images"
				height="300"
				width="400"
			/>
		</div>
	);
}

export default ImageUpload;
