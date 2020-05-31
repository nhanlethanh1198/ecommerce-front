import React from "react";
import { Link, withRouter } from "react-router-dom";

const Menu = () => {
	return (
		<div>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item">
					<Link className="nav-link" to="/">
						Home Page
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signin">
						Signin
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signup">
						Signup
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(Menu);
