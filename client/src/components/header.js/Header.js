import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./header.css";

const Header = ({ isAuth, setIsAuth, setUserId, setRole, role }) => {
	const history = useHistory();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) history.push("/login");
		else {
			const decodedJwt = jwt_decode(token);

			setUserId(decodedJwt.id);
			setRole(decodedJwt.role);
			setIsAuth(true);
		}
	});
	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsAuth(false);
		setUserId("");
		setRole("");
		history.push("/login");
	};
	return (
		<header className='header' style={{ margin: "0px" }}>
			<ul>
				<div className='header-right'>
					<li>
						<Link to='/'>home</Link>
					</li>
					{role === "admin" && (
						<Fragment>
							<li>
								<Link to='/uploads'>uploads </Link>
							</li>
							<li>
								<Link to='/books'>Books</Link>
							</li>
						</Fragment>
					)}
				</div>
				{!isAuth ? (
					<li style={{ float: "right" }}>
						<Link to='/login'>
							<button className='buttonForm'>Login</button>
						</Link>
					</li>
				) : (
					<li style={{ float: "right", height: "" }}>
						<button className='buttonForm' onClick={handleLogout}>
							Logout
						</button>
					</li>
				)}
			</ul>
		</header>
	);
};

export default Header;
