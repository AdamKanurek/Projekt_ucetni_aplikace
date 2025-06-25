// Enum-like object representing available countries in the system.
// Object.freeze ensures the object is immutable (cannot be changed at runtime).

const Country = Object.freeze({
	CZECHIA: 'CZECHIA',
	SLOVAKIA: 'SLOVAKIA',
});

export default Country;
