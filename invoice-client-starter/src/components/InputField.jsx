import React from "react";

export function InputField(props) {
	// Supported input types for <input> element
	const INPUTS = ["text", "number", "date", "email", "password"];

	// Normalize and validate input type
	const type = props.type.toLowerCase();
	const isTextarea = type === "textarea";
	const required = props.required || false;

	// Return null if type is invalid and not a textarea
	if (!isTextarea && !INPUTS.includes(type)) {
		return null;
	}

	// Assign min or minlength attribute depending on the input type
	const minProp = props.min || null;
	// For number and date inputs, use 'min' attribute
	const min = ["number", "date"].includes(type) ? minProp : null;
	// For text and textarea, use 'minLength' attribute
	const minlength = ["text", "textarea"].includes(type) ? minProp : null;

	// Make sure the value is safe (not undefined or null)
	// For number and date inputs, convert value to string as required by React
	let safeValue;
	if (props.value === undefined || props.value === null) {
		safeValue = "";
	} else if (type === "number" || type === "date") {
		safeValue = String(props.value);
	} else {
		safeValue = props.value;
	}

	return (
		<div className="form-group">
			{/* Label for the input */}
			<label>{props.label}:</label>

			{/* Conditionally render textarea or input based on type */}
			{isTextarea ? (
				<textarea
					required={required}
					className="form-control"
					placeholder={props.prompt}
					rows={props.rows}
					minLength={minlength}
					name={props.name}
					value={safeValue}
					onChange={props.handleChange}
				/>
			) : (
				<input
					required={required}
					type={type}
					className="form-control"
					placeholder={props.prompt}
					minLength={minlength}
					min={min}
					name={props.name}
					value={safeValue}
					onChange={props.handleChange}
				/>
			)}
		</div>
	);
}

export default InputField;
