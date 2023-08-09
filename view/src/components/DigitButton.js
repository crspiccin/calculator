export default function DigitButton({ value, click }) {
	return (
		<div>
			<button onClick={(e) => click(e.currentTarget.textContent)}>{value}</button>
		</div>
	);
}
