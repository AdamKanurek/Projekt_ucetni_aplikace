import React from "react";

export function InputSelect(props) {
	// whether the select allows multiple selections
	const multiple = props.multiple;
	// whether the field is required; default is false
	const required = props.required || false;
	// whether to return the whole object instead of just the id (only for single select)
	const returnObject = props.returnObject || false;

	// function to get the value for the select input
	// - if multiple, return array or empty array
	// - if the value is an object, return its _id
	// - otherwise return the value or empty string
	const getValue = () => {
		if (multiple) return props.value || [];
		if (typeof props.value === "object" && props.value !== null) return props.value._id || "";
		return props.value || "";
	};

	// handle change event on select
	// if returnObject is true and not multiple,
	// find the full object by _id and pass it to handleChange,
	// otherwise pass the original event through
	const handleChange = (e) => {
		const selectedValue = e.target.value;

		if (returnObject && !multiple) {
			const selectedItem = props.items.find((item) => item._id === Number(selectedValue));
			props.handleChange({
				target: {
					name: e.target.name,
					value: selectedItem || null,
				},
			});
		} else {
			props.handleChange(e);
		}
	};

	// determine if items are objects or enum keys
	// if enum prop exists, items are enum keys; else objects
	const objectItems = props.enum ? false : true;

	return (
		<div className="form-group">
			<label>{props.label}:</label>
			<select
				required={required}
				className="browser-default form-select"
				multiple={multiple}
				name={props.name}
				onChange={handleChange}
				value={getValue()}
			>
				{/* if not required, add a blank option at the top */}
				{!required && (
					<option key={0} value="" />
				)}

				{/* render options */}
				{objectItems
					? props.items.map((item, index) => (
						<option key={index + 1} value={item._id}>
							{item.name}
						</option>
					))
					: Object.keys(props.enum).map((key, index) => (
						<option key={index + 1} value={key}>
							{props.enum[key]}
						</option>
					))}
			</select>
		</div>
	);
};

export default InputSelect;
