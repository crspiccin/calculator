export default function Button({ value, click, klass }) {
	return (
		<div>
			<button onClick={(e) => click(e.currentTarget.textContent)}>{value}</button>
		</div>
	);
}
