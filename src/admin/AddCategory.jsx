import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// destructure user and token from localStorage
	const { user, token } = JSON.parse(isAuthenticated());

	const handleChange = (e) => {
        setError('');
        setName(e.target.value)
    };
	const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false)
        // make request to api to create category

    };

	const newCategoryForm = () => (
		<form onSubmit={onSubmit}>
			<div className="form-group ">
				<label className="text-muted">Name</label>
				<input
					type="text"
					className="form-control"
					onChange={handleChange}
					value={name}
					autoFocus
				/>
			</div>
			<button className="btn btn-outline-primary">Create Category</button>
		</form>
    );
    
    return (
		<Layout
			title="Add a new category"
			description={`Hello ${name}, ready to create category?`}>
			<div className="row">
			<div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
			</div>
		</Layout>
	);

};

export default AddCategory;
