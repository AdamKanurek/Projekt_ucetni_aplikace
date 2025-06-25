export function InputCheck(props) {
	// Supported input types for this component
	const INPUTS = ["checkbox", "radio"];

	// Normalize and validate input type
	const type = props.type.toLowerCase();
	// If checked is undefined or falsy, fallback to empty string (React expects boolean or string for checked)
	const checked = props.checked || "";

	// If type is not supported, render nothing
	if (!INPUTS.includes(type)) {
		return null;
	}

	return (
		<div className="form-group form-check">
			<label className="form-check-label">
				{/* Render input of specified type with given props */}
				<input
					type={props.type}
					className="form-check-input"
					name={props.name}
					value={props.value}
					checked={checked}
					onChange={props.handleChange}
				/>{" "}
				{/* Label text displayed next to checkbox/radio */}
				{props.label}
			</label>
		</div>
	);
}

export default InputCheck;
