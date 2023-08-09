import "@picocss/pico";
import "./theme.css";
import Calculator from "./components/Calculator";

function App() {
	return (
		<div className="App">
			<body>
				<nav class="container-fluid">
					<ul>
						<li>
							<h1>Calculator</h1>
						</li>
					</ul>
					<ul>{/* <li>{!isAuthenticated ? <Login /> : <Logout />}</li> */}</ul>
				</nav>
				<header>
					<main class="container">
						<Calculator />
					</main>
				</header>
			</body>
		</div>
	);
}

export default App;
