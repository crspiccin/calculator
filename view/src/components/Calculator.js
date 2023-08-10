import { useState } from "react";
import Display from "./Display";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import MemoryButton from "./MemoryButton";
import DecimalButton from "./DecimalButton";
import ResetButton from "./ResetButton";

export default function Calculator() {
	const [result, setResult] = useState("");
	const [isResultOperation, setResultOperation] = useState(false);
	const [digitStack, setDigitStack] = useState([]);
	const [operatorStack, setOperatorStack] = useState([]);
	const [memory, setMemory] = useState(0);
	const [history, setHistory] = useState([]);

	function handleDigit(value) {
		if (operatorStack.length === 0) {
			setDigitStack([]);
		}
		if (isResultOperation) {
			setResult(value);
			setResultOperation(false);
		} else {
			setResult(result + value);
		}
	}

	function handleOperator(value) {
		const digitStackTmp = [result, ...digitStack];

		console.log("digitStackTmp", digitStackTmp);
		console.log("operatorStack", operatorStack);
		setDigitStack(digitStackTmp);
		if (["*", "/", "-", "+", "=", "ˆ"].indexOf(value) !== -1 && operatorStack.length === 1) {
			const firstTerm = digitStackTmp.pop();
			const secondTerm = digitStackTmp.pop();
			const operator = operatorStack.pop();
			let expression = firstTerm + operator + secondTerm;
			if (operator === "ˆ") {
				expression = expression.replace("ˆ", "**");
			}
			console.log(expression);
			const result = eval(expression); // TODO Changeit
			setResult(result);
			setResultOperation(true);
			if (value !== "=") {
				digitStackTmp.push(result);
			}

			setDigitStack(digitStackTmp);
		} else if (value === "SQRT") {
			const firstTerm = digitStackTmp.pop();
			setResult(Math.sqrt(firstTerm));
			setResultOperation(true);
			digitStackTmp.push(result);
			setDigitStack(digitStackTmp);
		} else if (value === "%") {
			const firstTerm = digitStackTmp.pop();
			const secondTerm = digitStackTmp.pop();
			const operator = operatorStack.pop();
			let percentTerm = secondTerm / 100;
			if (["+", "-"].indexOf(operator) !== -1) {
				percentTerm *= firstTerm;
			}
			let expression = firstTerm + operator + percentTerm;
			const result = eval(expression); // TODO Changeit
			setResultOperation(true);
			digitStackTmp.push(result);
			setDigitStack(digitStackTmp);
			setResult(result);
		} else {
			setResult("");
		}
		if (["=", "SQRT"].indexOf(value) === -1) {
			setOperatorStack([...operatorStack, value]);
		}
	}

	function handleMemory(value) {
		switch (value) {
			case "MC":
				setMemory(0);
				setResult("");
				break;
			case "MR":
				setResult(memory);
				break;
			case "M+":
				setMemory(memory + Number(result));
				setResult("");
				break;
			case "M-":
				setMemory(memory - Number(result));
				setResult("");
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
		setDigitStack([]);
		setOperatorStack([]);
		setResult("");
	}
	return (
		<>
			<section>
				<Display value={result} />
			</section>
			<section>
				<div class="grid">
					<MemoryButton value="MC" click={handleMemory} />
					<MemoryButton value="MR" click={handleMemory} />
					<MemoryButton value="M-" click={handleMemory} />
					<MemoryButton value="M+" click={handleMemory} />
				</div>
				<div class="grid">
					<OperatorButton value="SQRT" click={handleOperator} />
					<OperatorButton value="ˆ" click={handleOperator} />
					<OperatorButton value="%" click={handleOperator} />
					<OperatorButton value="/" click={handleOperator} />
				</div>
				<div class="grid">
					<DigitButton value="7" click={handleDigit} />
					<DigitButton value="8" click={handleDigit} />
					<DigitButton value="9" click={handleDigit} />
					<OperatorButton value="*" click={handleOperator} />
				</div>
				<div class="grid">
					<DigitButton value="4" click={handleDigit} />
					<DigitButton value="5" click={handleDigit} />
					<DigitButton value="6" click={handleDigit} />
					<OperatorButton value="-" click={handleOperator} />
				</div>
				<div class="grid">
					<DigitButton value="1" click={handleDigit} />
					<DigitButton value="2" click={handleDigit} />
					<DigitButton value="3" click={handleDigit} />
					<OperatorButton value="+" click={handleOperator} />
				</div>
				<div class="grid">
					<ResetButton value="AC" click={handleReset} />
					<DigitButton value="0" click={handleDigit} />
					<DecimalButton value="." click={handleDecimal} />
					<OperatorButton value="=" click={handleOperator} />
				</div>
			</section>
		</>
	);
}
