import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";

const columns = [
	{ id: "title", label: "Name", minWidth: 170 },
	{ id: "publisher", label: "PublisherNamer", minWidth: 100 },
	{
		id: "isbn",
		label: "isbn",
		minWidth: 170,
		align: "right",
	},
	{
		id: "category",
		label: "category",
		minWidth: 170,
		align: "right",
	},
];

export default function CustomTable({ books }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "70%", margin: "25px auto" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{books
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((book) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={book.code}>
										{columns.map((column) => {
											const value = book[column.id];

											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number" ? (
														column.format(value)
													) : (
														<Link to={`/books/${book.id}`}>{value} </Link>
													)}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={books.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
