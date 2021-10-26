import { useState, useEffect, Fragment } from "react";

import { Card, Form, Row, Col, Button } from "react-bootstrap";
import EditForm from "./editForm";
import "./BookById.css";
import axios from "axios";

export default function BookById({ match, history }) {
	const [book, setBook] = useState();
	const [title, setTitle] = useState();
	const [publisher, setpublisher] = useState();
	const [isbn, setisbn] = useState();
	const [description, setdescription] = useState();
	const [location, setlocation] = useState();
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:5000/book/getBookById/${match.params.id}`)
			.then((res) => res.json())
			.then((data) => setBook(data));
	}, [updated]);

	const deleteBook = async () => {
		console.log("hello");
		axios
			.delete(`http://localhost:5000/book/deleteBookById/${book.id}`)
			.then(setBook(null));
		history.push("/books");
	};
	const updatedBook = { title, publisher, description, isbn };
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.patch(
				`http://localhost:5000/book/updateBookById/${book.id}`,
				updatedBook,
			)
			.then(() => {
				setUpdated(!updated);
				console.log(updated);
			});
	};
	return (
		<div>
			{book ? (
				<Fragment>
					<div className='bookContainer'>
						<Card
							style={{
								width: "50rem",
								minHeight: "20rem",
								backgroundColor: "silver",
								opacity: "0.8",

								margin: "20px auto",

								borderRadius: "15px",

								top: "50px",
							}}
						>
							<span className='header-title'>{book.title}</span>
							<Form onSubmit={handleSubmit}>
								<Form.Group
									as={Row}
									className='mb-3'
									controlId='formPlaintextEmail'
									style={{ marginLeft: "25px" }}
								>
									<Form.Label className='inputTitle' column sm='3'>
										title :
									</Form.Label>
									<Col sm='10'>
										<Form.Control
											plaintext
											defaultValue={book.title}
											onChange={(e) => {
												setTitle(e.target.value);
											}}
										/>
									</Col>
								</Form.Group>
								<Form.Group
									style={{ marginLeft: "25px" }}
									as={Row}
									className='mb-3'
									controlId='formPlaintextEmail'
								>
									<Form.Label className='inputTitle' column sm='3'>
										isbn :
									</Form.Label>
									<Col sm='10'>
										<Form.Control
											plaintext
											defaultValue={book.isbn}
											onChange={(e) => {
												setisbn(e.target.value);
											}}
										/>
									</Col>
								</Form.Group>
								<Form.Group
									style={{ marginLeft: "25px" }}
									as={Row}
									className='mb-3'
									controlId='formPlaintextEmail'
								>
									<Form.Label className='inputTitle' column sm='3'>
										description :
									</Form.Label>
									<Col sm='10'>
										<Form.Control
											onChange={(e) => {
												setdescription(e.target.value);
											}}
											plaintext
											defaultValue={book.description}
										/>
									</Col>
								</Form.Group>
								<Form.Group
									style={{ marginLeft: "25px" }}
									as={Row}
									className='mb-3'
									controlId='formPlaintextEmail'
								>
									<Form.Label className='inputTitle' column sm='3'>
										location :
									</Form.Label>
									<Col sm='10'>
										<Form.Control
											onChange={(e) => {
												setlocation(e.target.value);
											}}
											plaintext
											defaultValue={book.publisher}
										/>
									</Col>
								</Form.Group>
								<Form.Group
									style={{ marginLeft: "25px" }}
									as={Row}
									className='mb-3'
									controlId='formPlaintextEmail'
								>
									<Form.Label className='inputTitle' column sm='3'>
										location :
									</Form.Label>
									<Col sm='10'>
										<Form.Control
											onChange={(e) => {
												setpublisher(e.target.value);
											}}
											plaintext
											defaultValue={book.publisher}
										/>
									</Col>
								</Form.Group>
								<div
									style={{
										margin: "10px 250px",
										justifyContent: "space-around",
										flexDirection: "row",
									}}
								>
									<Button variant='success' type='submit'>
										save
									</Button>
									<Button
										style={{
											marginLeft: "10px ",
											backgroundColor: "red",
										}}
										onClick={deleteBook}
									>
										delete
									</Button>
								</div>
							</Form>
						</Card>
					</div>
				</Fragment>
			) : (
				<h1> no Book to show </h1>
			)}
		</div>
	);
}
