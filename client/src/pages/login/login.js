import React, { useState, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./login.css";

function Login({ setRole, setUserId, setIsAuth }) {
	const history = useHistory();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === "" || password === "") {
			setError(true);
			setErrorMessage("All fields are required");
			setTimeout(() => {
				setError(false);
			}, 1500);
			return;
		}
		const loginUser = { username, password };
		axios
			.post("http://localhost:5000/auth/login", loginUser)
			.then((res) => {
				setRole(res.data.role);
				setUserId(res.data.userId);
				localStorage.setItem("token", res.data.token);
				setIsAuth(true);
				history.push("/");
			})
			.catch(({ response }) => {
				setError(true);
				setErrorMessage(`${response.data.message}`);
			});
	};

	return (
		<Fragment>
			<div className='container'>
				<div className='register-container'>
					<form className='form-login' onSubmit={handleSubmit}>
						<div class='imgcontainer'>
							<img src='/images/avatar.png' alt='Avatar' class='avatar' />
						</div>
						<div className='register-form-control'>
							<label id='FormItem' htmlFor='username'>
								username
							</label>
							<input
								type='text'
								id='username'
								value={username}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className='register-form-control'>
							<label className='labell' htmlFor='password'>
								Password
							</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<button className='buttonForm' type='submit'>
								Login
							</button>
						</div>
						{error && (
							<small style={{ color: "#ff6961" }}>{errorMessage}</small>
						)}
					</form>
				</div>
			</div>
		</Fragment>
	);
}

export default Login;
