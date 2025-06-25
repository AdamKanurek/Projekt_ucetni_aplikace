// Formats a date string into either ISO format (YYYY-MM-DD) or Czech locale format
export const dateStringFormatter = (str, locale = false) => {
	const d = new Date(str);

	if (locale) {
		// Return date formatted according to Czech locale with full month name
		return d.toLocaleDateString("cs-CZ", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	// Extract year, month, and day as strings
	const year = d.getFullYear();
	const month = "" + (d.getMonth() + 1);
	const day = "" + d.getDate();

	// Return ISO-style date string with zero-padding for month and day
	return [
		year,
		month.length < 2 ? "0" + month : month,
		day.length < 2 ? "0" + day : day,
	].join("-");
};

export default dateStringFormatter;
