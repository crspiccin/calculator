import axios from "axios";

// const config = getAppConfig();

const url = "http://localhost:3010";

async function signup(user) {
	const response = await axios.post(url + "/users/signup", user, {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	return response.data.id;
}

async function login(user) {
	console.log(user);
	const response = await axios.post(url + "/users/login", user, {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	return {
		id: response.data.id,
		email: response.data.email,
	};
}

export { signup, login };
