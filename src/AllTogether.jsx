import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, app } from "./firebase";

const AllTogether = () => {
	const [address, setAddress] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [beds, setBeds] = useState("");
	const [baths, setBaths] = useState("");
	const [image, setImage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Upload the image to Firebase Storage
		const storageRef = ref(storage, `images/${image.name}`);
		await uploadBytes(storageRef, image);

		// Get the download URL of the uploaded image
		const downloadURL = await getDownloadURL(storageRef);

		// Store the address, zipcode, and image URL together as an object in Firestore
		const db = getFirestore(app);
		const addressData = {
			address: address,
			zipcode: zipcode,
			beds: beds,
			baths: baths,
			imageUrl: downloadURL,
		};
		await addDoc(collection(db, "addresses"), addressData);

		// Reset form fields
		setAddress("");
		setZipcode("");
		setBeds("");
		setBaths("");
		setImage(null);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setImage(file);
	};

	return (
		<form onSubmit={handleSubmit} className="the-form">
			<label>
				Address:
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				/>
			</label>
			<label>
				Zip Code:
				<input
					type="number"
					value={zipcode}
					onChange={(e) => setZipcode(e.target.value)}
					required
				/>
			</label>
			<label>
				Beds:
				<input
					type="number"
					value={beds}
					onChange={(e) => setBeds(e.target.value)}
					required
				/>
			</label>
			<label>
				Baths:
				<input
					type="number"
					value={baths}
					onChange={(e) => setBaths(e.target.value)}
					required
				/>
			</label>
			<label>
				Image:
				<input type="file" onChange={handleImageChange} required />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default AllTogether;
