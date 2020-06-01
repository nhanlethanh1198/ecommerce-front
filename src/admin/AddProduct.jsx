import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		loading: "",
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: "",
	});

	const { user, token } = JSON.parse(isAuthenticated());

	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		createdProduct,
		redirectToProfilelse,
		formData,
	} = values;

	// load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data,
					formData: new FormData(),
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });

		createProduct(user._id, token, formData).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					photos: "",
					price: "",
					quatity: "",
					loading: false,
					createdProduct: data.result.name,
				});
			}
		});
	};

	const newPostForm = () => (
		<form onSubmit={onSubmit} className="mb-3">
			<h4>Post Photo</h4>
			<div className="form-group">
				<label className="btn btn-secondary">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image/*"
					/>
				</label>
			</div>

			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Description</label>
				<textarea
					onChange={handleChange("description")}
					type="text"
					className="form-control"
					value={description}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Price</label>
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					value={price}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Category</label>
				<select
					onChange={handleChange("category")}
					className="form-control">
					<option>Please select a category</option>
					{categories &&
						categories.map((category, index) => (
							<option key={index} value={category._id}>
								{category.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<label className="text-muted">Shipping</label>
				<select
					onChange={handleChange("shipping")}
					className="form-control">
					<option>Please select!</option>
					<option value="0">No</option>
					<option value="1">Yes</option>
				</select>
			</div>
			<div className="form-group">
				<label className="text-muted">Quantity</label>
				<input
					onChange={handleChange("quantity")}
					type="number"
					className="form-control"
					value={quantity}
				/>
			</div>

			<button className="btn btn-outline-primary">Create Product</button>
		</form>
	);

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: createdProduct ? "" : "none" }}>
			<h2>{`${createdProduct}`} is created</h2>
		</div>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h2>Loading...</h2>
			</div>
		);

	return (
		<Layout
			title="Add a new product"
			description={`Hello ${user.name}, ready to create product?`}>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showError()}
					{showSuccess()}
					{showLoading()}
					{newPostForm()}
				</div>
			</div>
		</Layout>
	);
};

export default AddProduct;
