export default function Button({ value, click }) {
	return (
		<div>
			<button onClick={(e) => click(e.currentTarget.textContent)}>{value}</button>
		</div>
	);
}
