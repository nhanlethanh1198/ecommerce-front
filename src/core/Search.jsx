import React, { useState, useEffect, Fragment } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
	const [data, setData] = useState({
		categories: [],
		category: "",
		search: "",
		results: [],
		searched: false,
	});

	const { categories, category, search, results, searched } = data;

	const loadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				console.error(data.error);
			} else {
				setData({ ...data, categories: data });
			}
		});
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const handleChange = (name) => (event) => {
		setData({ ...data, [name]: event.target.value, searched: false });
	};

	const searchData = () => {
		// console.log(search, category);
		if (search) {
			list({ search: search || undefined, category: category }).then(
				(response) => {
					if (response.error) {
						console.log(response.error);
					} else {
						setData({ ...data, results: response, searched: true });
					}
				}
			);
		}
	};

	const searchSubmit = (event) => {
		event.preventDefault();
		searchData();
	};

	const searchMessage = (searched, results) => {
		if (searched && results.length > 0) {
			return `Found ${results.length} products`;
		}
		if (searched && results.length < 1) {
			return "No products found";
		}
	};

	const searchedProducts = (results = []) => {
		return (
			<div>
				<h2 className="mb-4 mt-4">
					{searchMessage(searched, results)}
				</h2>

				<div className="row">
					{results.map((product, index) => (
						<Card product={product} key={index} />
					))}
				</div>
			</div>
		);
	};

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<span className="input-group-text">
				<div className="input-group input-group-lg">
					<div className="input-group-prepend">
						<select
							className="btn mr-2"
							onChange={handleChange("category")}>
							<option value="All">Pick category</option>
							{categories.map((category, index) => (
								<option value={category._id} key={index}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<input
						type="search"
						onChange={handleChange("search")}
						className="form-control"
						placeholder="Search by name"
					/>
				</div>
				<div
					className="btn input-group-append"
					style={{ border: "none" }}>
					<button className="input-group-text">Search</button>
				</div>
			</span>
		</form>
	);

	return (
		<div className="row">
			<div className="container mb-2">{searchForm()}</div>
			<div className="container mb-2">{searchedProducts(results)}</div>
		</div>
	);
};

export default Search;
