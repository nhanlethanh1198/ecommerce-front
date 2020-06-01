import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
	const [values, setValues] = useState({
		email: "nhan2@gmail.com",
		password: "123456789",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, error, loading, redirectToReferrer } = values;
	const { user } = JSON.parse(isAuthenticated());

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const signupForm = () => (
		<form onSubmit={onSubmit}>
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
	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()){
			return <Redirect to="/" />
		}
	};

	return (
		<Layout
			className="container col-md-8 offset-md-2"
			title="Signin"
			description="Signin to Node React E-commerce App">
			{showLoading()}
			{showError()}
			{signupForm()}
			{redirectUser()}
		</Layout>
	);
};

export default Signin;
