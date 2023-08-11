import "@picocss/pico";
import "./theme.css";
import { useState } from "react";
import Calculator from "./components/Calculator";
import { signup, login } from "./misc/serviceFacadeAPI";

const MESSAGE_ERROR = "Service error, please try again in a few minutes.";

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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (modal.isLogin) {
			login(user)
				.then((userResponse) => {
					handleClose();
					setUser({ email: userResponse.email, isLogged: true, id: userResponse.id });
				})
				.catch((err) => {
					console.error("Error on signup", err);
					setMessage(MESSAGE_ERROR);
				});
		} else {
			if (user.password !== user.confirmPassword) {
				setMessage("Passwords do not match.");
			}
			signup(user)
				.then((id) => {
					handleClose();
					setUser({ ...user, id, isLogged: true });
				})
				.catch((err) => {
					console.error("Error on signup", err);
					setMessage(MESSAGE_ERROR);
				});
		}
	};

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
