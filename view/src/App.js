import "@picocss/pico";
import "./theme.css";
import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import { signup, login } from "./misc/serviceFacadeAPI";

const MESSAGE_ERROR = "Service error, please try again in a few minutes.";
const MESSAGE_INVALID_LOGIN = "Invalid Login";
const HTTP_STATUS_CODE_FORBIDDEN = 403;

function App() {
	const emptyUser = { email: "", password: "", confirmPassword: "", isLogged: false, id: "" };
	const [user, setUser] = useState(emptyUser);
	const [modal, setModal] = useState({ show: false, title: "Sign Up", isLogin: false });
	const [message, setMessage] = useState("");

	const handleLogin = () => {
		setModal({ ...modal, title: "Login", show: true, isLogin: true });
	};

	const handleSignUp = () => {
		setModal({ ...modal, title: "Sign Up", show: true, isLogin: false });
	};

	const handleClose = () => {
		if (!user.isLogged) {
			setUser(emptyUser);
		}
		setMessage("");
		setModal({ ...modal, show: false });
	};

	const handleLogout = () => {
		setUser(emptyUser);
		removeUserLocalSession();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (modal.isLogin) {
			login(user)
				.then((userResponse) => {
					handleClose();
					const userLogged = { email: userResponse.email, isLogged: true, id: userResponse.id };
					setUser(userLogged);
					setUserLocalSession(userLogged);
				})
				.catch((err) => {
					console.error("Error on login", err);
					if (err.response.status === HTTP_STATUS_CODE_FORBIDDEN) {
						setMessage(MESSAGE_INVALID_LOGIN);
					} else {
						setMessage(MESSAGE_ERROR);
					}
				});
		} else {
			if (user.password !== user.confirmPassword) {
				setMessage("Passwords do not match.");
			}
			signup(user)
				.then((id) => {
					handleClose();
					const userLogged = { ...user, id, isLogged: true };
					setUser(userLogged);
					setUserLocalSession(userLogged);
				})
				.catch((err) => {
					console.error("Error on signup", err);
					setMessage(MESSAGE_ERROR);
				});
		}
	};

	function setUserLocalSession(userParam) {
		localStorage.setItem("user", JSON.stringify(userParam));
	}
	function getUserLocalSession() {
		if (localStorage.getItem("user")) {
			return JSON.parse(localStorage.getItem("user"));
		}
		return null;
	}

	function removeUserLocalSession() {
		localStorage.removeItem("user");
	}

	useEffect(() => {
		const userSession = getUserLocalSession();
		if (userSession) {
			console.log("session", userSession);
			setUser(userSession);
		}
	}, []);

	return (
		<html>
			<div className="App">
				<nav class="container-fluid">
					<ul>
						<li>
							<strong>Calculator</strong>
						</li>
					</ul>

					{!user.isLogged ? (
						<ul>
							<li>
								<a href="#" onClick={handleSignUp}>
									Sign Up
								</a>
							</li>
							<li>
								<a href="#" data-target="modal" onClick={handleLogin}>
									Login
								</a>
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<a href="#">{user.email}</a>
							</li>
							<li>
								<a href="#" data-target="modal" onClick={handleLogout}>
									Logout
								</a>
							</li>
						</ul>
					)}
				</nav>
				<header></header>
				<body>
					<main class="container">
						<Calculator />
					</main>
					<dialog open={modal.show}>
						<article>
							<main class="container">
								<h3>{modal.title}</h3>
								<div>
									<form onSubmit={handleSubmit}>
										<input type="text" name="email" placeholder="Email" aria-label="Email" onChange={(event) => setUser({ ...user, email: event.target.value })} value={user.email} required />
										<input
											type="password"
											name="password"
											minlength="8"
											placeholder="Password"
											aria-label="Password"
											autocomplete="current-password"
											onChange={(event) => setUser({ ...user, password: event.target.value })}
											value={user.password}
											required
										/>
										{!modal.isLogin ? (
											<input
												type="password"
												name="confirmPassword"
												minlength="8"
												placeholder="Confirm Password"
												aria-label="ConfirmPassword"
												autocomplete="confirm-password"
												onChange={(event) => setUser({ ...user, confirmPassword: event.target.value })}
												value={user.confirmPassword}
												required
											/>
										) : (
											<span />
										)}
										<div>
											<h6>{message}</h6>
										</div>
										<button type="submit" class="contrast">
											Submit
										</button>
										<button type="cancel" onClick={handleClose}>
											Cancel
										</button>
									</form>
								</div>
							</main>
						</article>
					</dialog>
				</body>
			</div>
		</html>
	);
}

export default App;
