import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {
	const { user, token } = JSON.parse(isAuthenticated());
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
		createProduct: "",
		redirectToProfile: false,
		formData: "",
	});

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
		createProduct,
		redirectToProfilelse,
		formData,
    } = values;
    
    const handleChange = name => event => {
        
    }



	const newPostForm = () => (
		<form action="" className="mb-3">
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
                        <option value="5ed4e8b6520bc50fdc7157fd">Node</option>

                    </select>
			</div>
            <div className="form-group">
				<label className="text-muted">Shipping</label>
				<select
					onChange={handleChange("shipping")}
					className="form-control">
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

            <button className="btn btn-outline-primary">
                Create Product
            </button>
		</form>
	);

	return (
		<Layout
			title="Add a new product"
			description={`Hello ${user.name}, ready to create product?`}>
			<div className="row">
				<div className="col-md-8 offset-md-2">{newPostForm()}</div>
			</div>
		</Layout>
	);
};

export default AddProduct;
