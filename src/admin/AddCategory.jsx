import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createProduct } from "./apiAdmin";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// destructure user and token from localStorage
	const { user, token } = JSON.parse(isAuthenticated());

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		// make request to api to create category
		createProduct(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
			}
		});
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
					required
				/>
			</div>
			<button className="btn btn-outline-primary">Create Category</button>
		</form>
	);

	const showSuccess = () => {
		if (success) {
			return (
				<h3 className="text-success">
					{`"${name}"`} category is created!
				</h3>
			);
		}
	};
	const showError = () => {
		if (error) {
			return <h3 className="text-danger">{name} is should be unique!</h3>;
		}
	};

	const goBack = () => (
		<div className="mt-5">
			<Link to="/admin/dashboard" className="text-warning">
				Back to Dashboard
			</Link>
		</div>
	);

	return (
		<Layout
			title="Add a new category"
			description={`Hello ${user.name}, ready to create category?`}>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showSuccess()}
					{showError()}
					{newCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);
};

export default AddCategory;
