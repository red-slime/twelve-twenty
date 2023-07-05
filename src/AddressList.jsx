import React, { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	query,
	onSnapshot,
	where,
	orderBy,
	startAt,
	endAt,
} from "firebase/firestore";
import { app } from "./firebase";
import "./App.css";

const AddressList = () => {
	const [addresses, setAddresses] = useState([]);
	const [renderedAddresses, setRenderedAddresses] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchZip, setSearchZip] = useState("");
	const [bedroomCount, setBedroomCount] = useState("");
	const [bathroomCount, setBathroomCount] = useState("");
	const [formZip, setFormZip] = useState("");
	const [formBedrooms, setFormBedrooms] = useState("");
	const [formBathrooms, setFormBathrooms] = useState("");

	useEffect(() => {
		const db = getFirestore(app);
		let addressesRef = collection(db, "addresses");

		if (bedroomCount !== "") {
			addressesRef = query(addressesRef, where("beds", "==", bedroomCount));
		}

		if (bathroomCount !== "") {
			addressesRef = query(addressesRef, where("baths", "==", bathroomCount));
		}

		if (searchQuery !== "") {
			addressesRef = query(
				addressesRef,
				orderBy("address"),
				startAt(searchQuery),
				endAt(searchQuery + "\uf8ff")
			);
		}

		if (searchZip !== "") {
			addressesRef = query(
				addressesRef,
				orderBy("zipcode"),
				startAt(searchZip),
				endAt(searchZip + "\uf8ff")
			);
		}

		const unsubscribe = onSnapshot(addressesRef, (snapshot) => {
			const addressList = snapshot.docs.map((doc) => doc.data());
			setAddresses(addressList);
		});

		return () => unsubscribe();
	}, [searchQuery, searchZip, bedroomCount, bathroomCount]);

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
	};

	const handleSearchZip = (event) => {
		const query = event.target.value;
		setSearchZip(query);
	};

	const handleBedroomFilter = (event) => {
		const count = event.target.value;
		setBedroomCount(count);
	};

	const handleBathroomFilter = (event) => {
		const count = event.target.value;
		setBathroomCount(count);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const filteredAddresses = addresses.filter((address) => {
			return (
				formZip === "" ||
				address.zipcode === formZip ||
				formBedrooms === "" ||
				address.beds === formBedrooms ||
				formBathrooms === "" ||
				address.baths === formBathrooms
			);
		});
		setRenderedAddresses(filteredAddresses);
	};

	const handleRemoveAddress = (addressToRemove) => {
		setRenderedAddresses(
			renderedAddresses.filter(
				(address) => address.address !== addressToRemove.address
			)
		);
	};

	const handleAddAddress = (addressToAdd) => {
		if (
			!renderedAddresses.some(
				(address) => address.address === addressToAdd.address
			)
		) {
			setRenderedAddresses([...renderedAddresses, addressToAdd]);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={searchQuery}
				onChange={handleSearch}
				placeholder="Search by address"
			/>
			<input
				type="text"
				value={searchZip}
				onChange={handleSearchZip}
				placeholder="Search by zipcode"
			/>
			<select value={bedroomCount} onChange={handleBedroomFilter}>
				<option value="">All Bedrooms</option>
				<option value="1">1 Bedroom</option>
				<option value="2">2 Bedrooms</option>
				<option value="3">3 Bedrooms</option>
				<option value="4">4 Bedrooms</option>
				<option value="5">5 Bedrooms</option>
			</select>
			<select value={bathroomCount} onChange={handleBathroomFilter}>
				<option value="">All Bathrooms</option>
				<option value="1">1 Bathroom</option>
				<option value="2">2 Bathroom</option>
				<option value="3">3 Bathroom</option>
				<option value="4">4 Bathroom</option>
				<option value="5">5 Bathroom</option>
			</select>
			<div className="allList">
				{addresses.map((address) => (
					<div key={address.address} className="il">
						<p>Address: {address.address}</p>
						<p>Zip Code: {address.zipcode}</p>
						<p>Beds: {address.beds}</p>
						<p>Baths: {address.baths}</p>
						<img src={address.imageUrl} alt="Address" />
						<button onClick={() => handleAddAddress(address)}>
							Add to List
						</button>
					</div>
				))}
			</div>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					value={formZip}
					onChange={(e) => setFormZip(e.target.value)}
					placeholder="Enter zipcode"
				/>
				<input
					type="number"
					value={formBedrooms}
					onChange={(e) => setFormBedrooms(e.target.value)}
					placeholder="Enter number of bedrooms"
				/>
				<input
					type="number"
					value={formBathrooms}
					onChange={(e) => setFormBathrooms(e.target.value)}
					placeholder="Enter number of bathrooms"
				/>
				<button type="submit">Submit</button>
			</form>
			<div className="renderedList">
				{renderedAddresses.map((address) => (
					<div key={address.address} className="il">
						<p>Address: {address.address}</p>
						<p>Zip Code: {address.zipcode}</p>
						<p>Beds: {address.beds}</p>
						<p>Baths: {address.baths}</p>
						<img src={address.imageUrl} alt="Address" />
						<button onClick={() => handleRemoveAddress(address)}>Remove</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddressList;
