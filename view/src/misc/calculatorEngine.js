const operatorStack = [];
const digitStack = [];

const reDigit = /[0-9]{1}/;

function calc(token) {
	if (reDigit.test(token)) {
		digitStack.push(token);
	} else if (token === "+" || token === "-") {
	} else if (token === "*" || token === "/") {
	}
}

function reset() {}
