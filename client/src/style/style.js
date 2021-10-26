import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
	navBar: {
		backgroundColor: "#203040",
		"& a": {
			color: "#ffffff",
			marginLeft: 10,
		},
	},
	main: {
		minHeight: "80vh",
	},
	footer: {
		textAlign: "center",
		backgroundColor: "#203040",
		color: "#ffffff",
		fontSize: "1.6rem",
		marginBottom: 0,
	},
	brand: {
		fontSize: "1.6rem",
	},
	grow: {
		flexGrow: 1,
	},
	image: {
		maxHeight: 200,
	},
	card: {
		maxWidth: 300,
		maxHeight: 400,
		margin: "auto",
		backgroundColor: "#DCDCDC",
		color: "#fffff",
	},
});

export default useStyle;
