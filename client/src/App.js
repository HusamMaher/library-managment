import { Fragment, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./components/header.js/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Book from "./pages/Book.js/Book";
import UserContext from "./context/user.context";
import Upload from "./pages/upload/Upload";
import BookById from "./pages/Book.js/BookById";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [role, setRole] = useState("");
	const [userId, setUserId] = useState("");
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return <Redirect to='/login' />;
		const decoded = jwt_decode(token);
		setIsAuth(true);
		setUserId(decoded.id);
		setRole(decoded.role);
	});
	return (
		<Fragment>
			<UserContext.Provider value={{ role, setRole, isAuth, setIsAuth }}>
				<Router>
					<Header
						isAuth={isAuth}
						setIsAuth={setIsAuth}
						setUserId={setUserId}
						setRole={setRole}
						role={role}
					></Header>
					<main>
						<Switch>
							<Route path='/' exact component={Home}></Route>
							<Route path='/login'>
								<Login
									setRole={setRole}
									setUserId={setUserId}
									setIsAuth={setIsAuth}
								/>
							</Route>
							<Route path='/uploads' component={Upload}></Route>
							<Route path='/books' exact>
								<Book />
							</Route>
							<Route path='/books/:id' component={BookById}></Route>
						</Switch>
					</main>
				</Router>
			</UserContext.Provider>
		</Fragment>
	);
}

export default App;
