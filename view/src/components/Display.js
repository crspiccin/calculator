export default function Display({ value }) {
	return (
		<label for="result" dir="rtl">
			<input type="text" id="result" name="result" value={value} />
		</label>
	);
}
