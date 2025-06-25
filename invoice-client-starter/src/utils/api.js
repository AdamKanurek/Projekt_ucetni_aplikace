const API_URL = "http://localhost:8080";

// Custom error class to handle HTTP request errors with additional response info
export class HttpRequestError extends Error {
	constructor(message, response, errorData = null) {
		super(message);
		this.response = response;
		this.errorData = errorData;
	}
}

// Core function to perform fetch requests with standardized options and error handling
const fetchData = (url, requestOptions = {}) => {
	const apiUrl = `${API_URL}${url}`;
	const allRequestOptions = {
		credentials: "include", // Include cookies and credentials in requests
		...requestOptions,
	};

	return fetch(apiUrl, allRequestOptions)
		.then(async (response) => {
			if (!response.ok) {
				// Prepare default error message
				let errorMessage = `Network response was not ok: ${response.status} ${response.statusText}`;
				let errorData = null;

				// Try to parse error details from response JSON
				try {
					errorData = await response.json();
					if (errorData?.message) {
						errorMessage = errorData.message;
					}
				} catch (_) { }

				// Throw a custom error including response and data
				throw new HttpRequestError(errorMessage, response, errorData);
			}

			// For all requests except DELETE, parse and return JSON response
			if (allRequestOptions.method !== "DELETE") {
				return response.json();
			}
		});
};

// GET request helper with query parameters filtering out null/undefined
export const apiGet = (url, params) => {
	const filteredParams = Object.fromEntries(
		Object.entries(params || {}).filter(([_, value]) => value != null)
	);

	const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
	const requestOptions = {
		method: "GET",
	};

	return fetchData(apiUrl, requestOptions);
};

// POST request helper sending JSON body
export const apiPost = (url, data) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	return fetchData(url, requestOptions);
};

// PUT request helper sending JSON body
export const apiPut = (url, data) => {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	return fetchData(url, requestOptions);
};

// DELETE request helper
export const apiDelete = (url) => {
	const requestOptions = {
		method: "DELETE",
	};

	return fetchData(url, requestOptions);
};
