import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
	const [checked, setChecked] = useState([]);

	const handleToggle = (categoryId) => () => {
		// return the first index of -1
		const currentCategoryId = checked.indexOf(categoryId);
		const newCheckedCategoryId = [...checked];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentCategoryId === -1) {
			newCheckedCategoryId.push(categoryId);
		} else {
			newCheckedCategoryId.splice(currentCategoryId, 1);
		}
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId)
    };
    


	return categories.map((category, index) => (
		<li className="list-unstyled" key={index}>
			<input
				onChange={handleToggle(category._id)}
				type="checkbox"
				value={checked.indexOf(category._id=== -1)}
				className="form-check-input"
			/>
			<label className="form-check-label">{category.name}</label>
		</li>
	));
};

export default Checkbox;
