export default function MemoryButton({ value, click }) {
	return (
		<div>
			<button class="contrast" onClick={(e) => click(e.currentTarget.textContent)}>
				{value}
			</button>
		</div>
	);
}
