import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useState } from "react";

const EditForm = ({ book }) => {
	const id = book.id;

	const [title, setTitle] = useState(book.title);
	const [publisher, setpublisher] = useState(book.publisher);
	const [description, setDescription] = useState(book.address);
	const [isbn, setIsbn] = useState(book.isbn);

	const updatedBook = { id, title, publisher, description, isbn };

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios
			.patch(`${process.env.HOSTNAME}book/updateBookById/${id}`, {
				updatedBook,
			})
			.then((res) => console.log(res));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type='text'
					placeholder='title *'
					name='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type='publisher'
					placeholder='publisher *'
					name='email'
					value={publisher}
					onChange={(e) => setpublisher(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as='textarea'
					placeholder='isbn'
					rows={3}
					name='isbn'
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type='text'
					placeholder='description '
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Form.Group>
			<Button variant='success' type='submit' block>
				Edit Book
			</Button>
		</Form>
	);
};

export default EditForm;
