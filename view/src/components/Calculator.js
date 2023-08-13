import { useState, useRef } from "react";
import { evaluate } from "mathjs";
import Display from "./Display";
import MemoryButton from "./MemoryButton";
import Button from "./Button";
import ResetButton from "./ResetButton";

export default function Calculator() {
	const [result, setResult] = useState("");
	const [isResultOperation, setResultOperation] = useState(false);
	const digitStack = useRef([]);
	const operatorStack = useRef([]);
	const memory = useRef(0);
	const history = useRef("");
	const [showHistory, setShowHistory] = useState(false);

	function handleDigit(value) {
		if (operatorStack.current.length === 0) {
			digitStack.current = [];
		}
		if (isResultOperation) {
			setResult(value);
			setResultOperation(false);
		} else {
			setResult(result + value);
		}
	}

	function handleOperator(value) {
		digitStack.current = [result, ...digitStack.current];
		if (["*", "/", "-", "+", "=", "^"].indexOf(value) !== -1 && operatorStack.current.length === 1) {
			const firstTerm = digitStack.current.pop();
			const secondTerm = digitStack.current.pop();
			const operator = operatorStack.current.pop();
			let expression = firstTerm + operator + secondTerm;
			const result = evaluate(expression);
			setResult(result);
			setResultOperation(true);
			if (value !== "=") {
				digitStack.current.push(result);
			}
		} else if (value === "SQRT") {
			const firstTerm = digitStack.current.pop();
			const result = evaluate("sqrt(" + firstTerm + ")");
			setResult(result);
			setResultOperation(true);
			digitStack.current.push(result);
		} else if (value === "%") {
			const firstTerm = digitStack.current.pop();
			const secondTerm = digitStack.current.pop();
			let result = 0;
			if (!secondTerm) {
				// in case of only digit and %, like 100%
				result = firstTerm / 100;
			} else {
				const operator = operatorStack.current.pop();
				let percentTerm = secondTerm / 100;
				if (["+", "-"].indexOf(operator) !== -1) {
					percentTerm *= firstTerm;
				}
				let expression = firstTerm + operator + percentTerm;
				result = evaluate(expression);
			}
			setResultOperation(true);
			digitStack.current.push(result);
			setResult(result);
		} else {
			setResult("");
		}
		if (["=", "SQRT"].indexOf(value) === -1) {
			operatorStack.current = [...operatorStack.current, value];
		}
	}

	function handleMemory(value) {
		switch (value) {
			case "MC":
				memory.current = 0;
				setResult("");
				break;
			case "MR":
				setResult(memory.current);
				break;
			case "M+":
				memory.current = memory.current + Number(result);
				setResult("");
				break;
			case "M-":
				memory.current = memory.current - Number(result);
				setResult("");
				break;
			case "History":
				setShowHistory(true);
				break;
			default:
				console.error("invalid value", value);
		}
	}

	function handleDecimal(value) {
		if (!isResultOperation && !result.includes(value) && result !== "") {
			setResult(result + value);
		}
	}

	function handleReset(value) {
		history.current = "";
		digitStack.current = [];
		operatorStack.current = [];
		setResult("");
	}

	function handleAppendHistory(value) {
		if (isResultOperation && history.current !== "") {
			history.current += " " + result;
		}
		history.current += " " + value;
	}

	return (
		<>
			<section>
				<Display value={result} />
			</section>
			<section onClick={(e) => handleAppendHistory(e.target.textContent)}>
				<div class="grid">
					<MemoryButton value="MC" click={handleMemory} />
					<MemoryButton value="MR" click={handleMemory} />
					<MemoryButton value="M-" click={handleMemory} />
					<MemoryButton value="M+" click={handleMemory} />
					<MemoryButton value="History" click={handleMemory} />
				</div>
				<div class="grid">
					<Button value="SQRT" click={handleOperator} />
					<Button value="^" click={handleOperator} />
					<Button value="%" click={handleOperator} />
					<Button value="/" click={handleOperator} />
				</div>
				<div class="grid">
					<Button value="7" click={handleDigit} />
					<Button value="8" click={handleDigit} />
					<Button value="9" click={handleDigit} />
					<Button value="*" click={handleOperator} />
				</div>
				<div class="grid">
					<Button value="4" click={handleDigit} />
					<Button value="5" click={handleDigit} />
					<Button value="6" click={handleDigit} />
					<Button value="-" click={handleOperator} />
				</div>
				<div class="grid">
					<Button value="1" click={handleDigit} />
					<Button value="2" click={handleDigit} />
					<Button value="3" click={handleDigit} />
					<Button value="+" click={handleOperator} />
				</div>
				<div class="grid">
					<ResetButton value="AC" click={handleReset} />
					<Button value="0" click={handleDigit} />
					<Button value="." click={handleDecimal} />
					<Button value="=" click={handleOperator} />
				</div>
			</section>
			<dialog open={showHistory}>
				<article>
					<header>
						<a href="#close" aria-label="Close" class="close" onClick={() => setShowHistory(false)}></a>
						History
					</header>
					<p>{history.current}</p>
				</article>
			</dialog>
		</>
	);
}
