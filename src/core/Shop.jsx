import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilterProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./FixPrices";
import Radiobox from "./Radiobox";

const Shop = () => {
	const [myFilters, setMyFilters] = useState({
		filters: {
			category: [],
			price: [],
		},
	});
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(6);
	const [skip, setSkip] = useState(0);
	const [filteredResults, setFilteredResults] = useState(0);

	// load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	const loadFilterResults = (newFilters) => {
		getFilterProducts(skip, limit, newFilters).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setFilteredResults(data);
			}
		});
	};

	useEffect(() => {
		init();
		loadFilterResults(skip, limit, myFilters.filters)
	}, []);

	const handleFilters = (filters, filterBy) => {
		// console.log(filters, filterBy);
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;
		if (filterBy === "price") {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}
		loadFilterResults(myFilters.filters);
		setMyFilters(newFilters);
	};

	const handlePrice = (values) => {
		const data = prices;
		let array = [];
		for (let key in data) {
			if (data[key]._id === parseInt(values)) {
				array = data[key].array;
			}
		}
		return array;
	};

	return (
		<Layout
			title="Shop Page"
			description="Search and find books of your choice"
			className="container">
			<div className="row">
				<div className="col-4">
					<h4>Filter by categories</h4>
					<ul>
						<Checkbox
							categories={categories}
							handleFilters={(filters) =>
								handleFilters(filters, "category")
							}
						/>
					</ul>
					<h4>Filter by price range</h4>
					<div>
						<Radiobox
							prices={prices}
							handleFilters={(filters) =>
								handleFilters(filters, "price")
							}
						/>
					</div>
				</div>
				<div className="col-8">{JSON.stringify(filteredResults)}</div>
			</div>
		</Layout>
	);
};

export default Shop;
