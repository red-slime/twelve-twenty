import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase"; // Assuming this is the correct path to your firebase.js file

const AddressForm = () => {
	const [address, setAddress] = useState("");
	const [zipcode, setZipcode] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const db = getFirestore(app);

		await addDoc(collection(db, "addresses"), {
			address,
			zipcode: Number(zipcode),
		});

		setAddress("");
		setZipcode("");
	};

	return (
		<form onSubmit={handleSubmit}>
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
			<input type="submit" value="Submit" />
		</form>
	);
};

export default AddressForm;
