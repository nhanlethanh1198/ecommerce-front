import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";

const Dashboard = () => {
	const {
		user: { _id, name, email, role },
	} = JSON.parse(isAuthenticated());

	const userLinks = () => {
		return (
			<div className="card">
				<h3 className="card-header">User Links</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/cart" className="nav-link">
							My Cart
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/profile/update" className="nav-link">
							Update Profile
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const userInfo = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">User information</h3>
				<ul className="list-group">
					<li className="list-group-item">{name}</li>
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">
						{role === 1 ? "Admin" : "Register"}
					</li>
				</ul>
			</div>
		);
	};

	const purchaseHistory = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">Purchase history</h3>
				<ul className="list-group">
					<li className="list-group-item">history</li>
				</ul>
			</div>
		);
	};

	return (
		<Layout
			title="Dashboard"
			description={`Hello ${name}!`}
			className="container">
			<div className="row">
				<div className="col-3">{userLinks()}</div>
				<div className="col-9">
					{userInfo()}
					{purchaseHistory()}
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
