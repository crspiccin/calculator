import { useState } from "react";
import Display from "./Display";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import MemoryButton from "./MemoryButton";
import DecimalButton from "./DecimalButton";
import ResetButton from "./ResetButton";

export default function Calculator() {
	const [result, setResult] = useState(0);

	function handleState(value) {
		setResult(value);
	}

	return (
		<>
			<section>
				<Display value={result} />
			</section>
			<section>
				<div class="grid">
					<MemoryButton value="MC" click={handleState} />
					<MemoryButton value="MR" click={handleState} />
					<MemoryButton value="M-" click={handleState} />
					<MemoryButton value="M+" click={handleState} />
				</div>
				<div class="grid">
					<OperatorButton value="SQRT" click={handleState} />
					<OperatorButton value="Xˆy" click={handleState} />
					<OperatorButton value="%" click={handleState} />
					<OperatorButton value="/" click={handleState} />
				</div>
				<div class="grid">
					<DigitButton value="7" click={handleState} />
					<DigitButton value="8" click={handleState} />
					<DigitButton value="9" click={handleState} />
					<OperatorButton value="X" click={handleState} />
				</div>
				<div class="grid">
					<DigitButton value="4" click={handleState} />
					<DigitButton value="5" click={handleState} />
					<DigitButton value="6" click={handleState} />
					<OperatorButton value="-" click={handleState} />
				</div>
				<div class="grid">
					<DigitButton value="1" click={handleState} />
					<DigitButton value="2" click={handleState} />
					<DigitButton value="3" click={handleState} />
					<OperatorButton value="+" click={handleState} />
				</div>
				<div class="grid">
					<ResetButton value="AC" click={handleState} />
					<DigitButton value="0" click={handleState} />
					<DecimalButton value="." click={handleState} />
					<OperatorButton value="=" click={handleState} />
				</div>
			</section>
		</>
	);
}
