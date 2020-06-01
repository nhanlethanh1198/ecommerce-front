import { API } from "../config";
// import axios from "axios";

export const signup = (user) => {
	return fetch(`${API}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
	// let { name, email, password } = user;
	// return axios
	// 	.post(`${API}/signup`, {
	// 		name,
	// 		email,
	// 		password,
	// 	})
	// 	.then((response) => {
	// 		console.log("Submit success!", response);
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
};
