import React, { Fragment } from "react";
import BookItem from "./bookItem";
import { Grid } from "@material-ui/core";

export default function BookList(props) {
	return (
		<Fragment>
			{props.books ? (
				<Grid container spacing={4} margin='dense'>
					{props.books.map((book) => (
						<Grid item md={4} key={book.name}>
							<BookItem book={{ ...book }} />
						</Grid>
					))}
				</Grid>
			) : (
				<h1> no Books to show</h1>
			)}
		</Fragment>
	);
}
