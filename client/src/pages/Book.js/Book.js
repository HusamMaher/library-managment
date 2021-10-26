import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import BookList from "../../components/Books/bookList";
import "./Book.css";
import { useHistory } from "react-router";
import CustomTable from "../../components/CustomTable";

function Book() {
	const [books, setBooks] = useState([]);
	const [filter, setFilter] = useState("title");
	const [keyword, setKeyword] = useState("");
	const [keyOption, setKeyOption] = useState("title");

	useEffect(() => {
		async function fetchData() {
			axios.get("http://localhost:5000/book/getAllBooks").then(({ data }) => {
				console.log(data);
				setBooks((prev) => prev.concat(...data));
			});
		}
		console.log("fetched");
		fetchData();
	}, []);
	books.sort((a, b) => {
		const firstItem = a[filter].toUpperCase();
		const secondItem = b[filter].toUpperCase();

		if (firstItem < secondItem) return -1;
		else {
			return 1;
		}
	});
	const filtered = books.filter((book) => {
		if (keyword === "") return book;
		else if (book[keyOption].toLowerCase().includes(keyword.toLowerCase()))
			return book;
	});

	return (
		<div style={{ top: "50pxs" }}>
			{books.length > 0 ? (
				<Fragment>
					<ul style={{ backgroundColor: "none" }}>
						<div>
							<h3 style={{ color: "aliceblue" }}>sort by :</h3>
							<li>
								<button
									className='radio-btn'
									onClick={(e) => {
										setFilter("publisher");
									}}
								>
									publisher
								</button>
							</li>
							<li>
								<button
									className='radio-btn'
									onClick={(e) => {
										setFilter("title");
									}}
								>
									title
								</button>
							</li>
						</div>
					</ul>
					<div className='searchCriteria'>
						<div className='searchBar'>
							<form id='searchFom'>
								<input
									type='text'
									placeholder='Search..'
									name='search'
									className='searchInput'
									onChange={(e) => {
										setKeyword(e.target.value);
									}}
								/>
							</form>
						</div>
						<div>
							<h3 style={{ color: "#f0f8ff" }}>search filter:</h3>
							<div className='radio-btn-container'>
								<div
									className='radio-btn'
									onClick={() => {
										setKeyOption("title");
									}}
								>
									<input
										type='radio'
										value='title'
										name='option'
										checked={keyOption === "title"}
									/>
									title
								</div>
								<div
									className='radio-btn'
									onClick={() => {
										setKeyOption("publisher");
									}}
								>
									<input
										type='radio'
										value='publisher'
										name='option'
										checked={keyOption === "publisher"}
									/>
									publisher
								</div>
							</div>
						</div>
					</div>
					<CustomTable books={filtered} />
					{/* <BookList books={filtered} /> */}
				</Fragment>
			) : (
				<h1 style={{ color: "gray", textAlign: "center" }}>
					there is no books in the data base
				</h1>
			)}
		</div>
	);
}

export default Book;
