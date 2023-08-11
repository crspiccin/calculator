export default function Display({ value }) {
	return (
		<label for="result">
			<input type="text" id="result" name="result" value={value} />
		</label>
	);
}
