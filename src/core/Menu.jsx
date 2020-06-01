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
	console.log(isAuthenticated());
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
