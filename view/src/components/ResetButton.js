export default function ResetButton({ value, click }) {
	return (
		<div>
			<button class="secondary" onClick={(e) => click(e.currentTarget.textContent)}>
				{value}
			</button>
		</div>
	);
}
