import React from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@material-ui/core";

import useStyle from "../../style/style";
export default function BookItem({ book }) {
	const classes = useStyle();

	return (
		<div>
			<Card className={classes.card}>
				<CardActionArea>
					<Link to={`/book/${book.id}`}>
						<CardMedia
							className={classes.image}
							component='img'
							image='/images/logo192.png'
							title={book.name}
						></CardMedia>
					</Link>
					<CardContent>
						<Typography color='red' variant='h4'>
							{book.title}
						</Typography>
						<Typography variant='h5'>{book.description}</Typography>

						<Typography variant='subtitle'>{book.publisher}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}
