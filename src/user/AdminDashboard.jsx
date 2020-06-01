import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = JSON.parse(isAuthenticated());

	const adminLinks = () => {
		return (
			<div className="card">
				<h3 className="card-header">Admin Links</h3>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/create/category" className="nav-link">
							Create Category
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/create/product" className="nav-link">
							Create Product
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminInfo = () => {
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

	return (
		<Layout
			title="Dashboard"
			description={`Hello ${name}!`}
			className="container">
			<div className="row">
				<div className="col-3">{adminLinks()}</div>
				<div className="col-9">
					{adminInfo()}
				</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
