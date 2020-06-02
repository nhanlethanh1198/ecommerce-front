import React, { useState, Fragment } from "react";

const Radiobox = ({ prices, handleFilters }) => {
	const [values, setValues] = useState(0);

	const handleChange = (event) => {
		handleFilters(event.target.value);
		setValues(event.target.value);
	};

	return prices.map((price, index) => (
		<div key={index}>
			<input
                onChange={handleChange}
                name="price"
				type="radio"
				value={`${price._id}`}
				className="mr-2 ml-4"
			/>
			<label className="form-check-label">{price.name}</label>
		</div>
	));
};

export default Radiobox;
