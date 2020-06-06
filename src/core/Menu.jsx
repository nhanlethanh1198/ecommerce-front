import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#ff9900" };
	} else {
		return { color: "#ffffff" };
	}
};

const Menu = ({ history }) => {
	return (
		<Fragment>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/")}
						to="/">
						Home Page
					</Link>
				</li>
				<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/shop")}
						to="/shop">
						Shop
					</Link>
				</li>
				{
					isAuthenticated() && console.log(JSON.parse(isAuthenticated()).user.role)
				}
				{isAuthenticated() && JSON.parse(isAuthenticated()).user.role === 0 && (
					<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/user/dashboard")}
						to="/user/dashboard">
						Dashboard
					</Link>
				</li>
				)}
				{isAuthenticated() && JSON.parse(isAuthenticated()).user.role === 1 && (
					<li className="nav-item">
					<Link
						className="nav-link"
						style={isActive(history, "/admin/dashboard")}
						to="/admin/dashboard">
						Dashboard
					</Link>
				</li>
				)}
				{!isAuthenticated() && (
					<Fragment>
						<li className="nav-item">
							<Link
								className="nav-link"
								style={isActive(history, "/signin")}
								to="/signin">
								Signin
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								style={isActive(history, "/signup")}
								to="/signup">
								Signup
							</Link>
						</li>
					</Fragment>
				)}
				{isAuthenticated() && (
					<li className="nav-item">
						<span
							className="nav-link"
							style={{ cursor: "pointer", color: "#ffffff" }}
							onClick={() =>
								signout(() => {
									history.push("/");
								})
							}>
							Signout
						</span>
					</li>
				)}
			</ul>
		</Fragment>
	);
};

export default withRouter(Menu);
