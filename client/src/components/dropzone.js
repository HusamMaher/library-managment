import React, { useMemo, useState, useEffect, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./dropzone.css";
import Loading from "./loading";
const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const activeStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

export function StyledDropzone() {
	const [file, setFile] = useState();
	const [Loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		acceptedFiles,
	} = useDropzone({
		accept:
			"application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept],
	);

	const onClickHandler = async () => {
		setLoading(true);
		const data = new FormData();
		data.append("file", file);
		axios
			.post("http://localhost:5000/upload/xlsFile", data)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				setError(true);
				setErrorMessage(`${error.response.data}`);
				setTimeout(() => {
					setError(false);
				}, 5000);
			});
		setLoading(false);
	};
	const files = acceptedFiles.map((file) => <li>{file.name}</li>);

	useEffect(() => {
		setFile(acceptedFiles[0]);
		console.log(file);
	}, [acceptedFiles, file]);

	return (
		<Fragment>
			{Loading && <Loading type='balls' color='#4f93ff' />}
			<div className='dropzone-container'>
				<div className='dropzone'>
					<div {...getRootProps({ style })}>
						<input {...getInputProps()} />
						<p>Drag drop some xls file only, or click to select files</p>
					</div>
					<aside>
						<h4>Files</h4>
						<ul>{files}</ul>
					</aside>
				</div>

				<button type='button' className='buttonForm' onClick={onClickHandler}>
					send
				</button>
				{error && <small style={{ color: "#ff6961" }}>{errorMessage}</small>}
			</div>
		</Fragment>
	);
}
