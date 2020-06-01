import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const { name, email, password, error, success } = values;

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password }).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error:
						parseInt(data.error.slice(0,5)) === 11000
							? "Email already exists"
							: data.error,
					success: false,
				});
				console.log(data.error);
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					success: true,
				});
			}
		});
	};

	const signupForm = () => (
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					type="text"
					className="form-control"
					onChange={handleChange("name")}
					value={name}
					placeholder="Your name"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					type="email"
					className="form-control"
					onChange={handleChange("email")}
					value={email}
					placeholder="Your email"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					type="password"
					className="form-control"
					onChange={handleChange("password")}
					value={password}
					placeholder="Your password"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);
	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: success ? "" : "none" }}>
			New account is created. <Link to="/signin">Please Signin</Link>
		</div>
	);

	return (
		<Layout
			className="container col-md-8 offset-md-2"
			title="Signup"
			description="Signup to Node React E-commerce App">
			{showSuccess()}
			{showError()}
			{signupForm()}
		</Layout>
	);
};

export default Signup;
