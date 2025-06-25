import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import { useSession } from "../contexts/session";

import Country from "./Country";

const PersonForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [person, setPerson] = useState({
		name: "",
		identificationNumber: "",
		taxNumber: "",
		accountNumber: "",
		bankCode: "",
		iban: "",
		telephone: "",
		mail: "",
		street: "",
		zip: "",
		city: "",
		country: Country.CZECHIA,
		note: ""
	});
	const [sentState, setSent] = useState(false); // track whether the form was submitted
	const [successState, setSuccess] = useState(false); // track submission success
	const [errorState, setError] = useState(null); // track any error messages

	// Load existing person data if editing
	useEffect(() => {
		if (id) {
			apiGet("/api/persons/" + id).then((data) => setPerson(data));
		}
	}, [id]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Decide whether to create or update based on presence of `id`
		(id ? apiPut("/api/persons/" + id, person) : apiPost("/api/persons", person))
			.then((data) => {
				setSent(true);
				setSuccess(true);
				navigate("/persons");
			})
			.catch((error) => {
				console.log(error.message);
				setError(error.errorData || {message: error.message});
				setSent(true);
				setSuccess(false);
			});
	};

	const sent = sentState;
	const success = successState;
	const { session } = useSession();
	const isAdmin = session.data?.isAdmin === true;
	const isLoadingSession = session.status === "loading";

	// If not admin and session is ready, redirect
	useEffect(() => {
		if (!isAdmin && !isLoadingSession) {
			if (id) {
				navigate("/persons/show/" + id);
			} else {
				navigate("/persons");
			}
		}
	}, [isAdmin, isLoadingSession, id]);

	// Show loading spinner if admin status is not yet known
	if (!isAdmin) {
		return (
			<div className="d-flex justify-content-center mt-2">
				<div className="spinner-border spinner-border-sm" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div>
			<h1>{id ? "👤 Upravit" : "👤 Vytvořit"} osobnost</h1>
			<hr />
			{/* Show error message if request failed */}
			{errorState?.errors ? (
				<div className="alert alert-danger">
					<ul>
						{Object.entries(errorState.errors).map(([field, message]) => (
							<li key={field}>
								{message}
							</li>
						))}
					</ul>
				</div>
			) : errorState?.message ? (
				<div className="alert alert-danger">{errorState.message}</div>
			) : null}

			{/* Show success message after saving */}
			{sent && (
				<FlashMessage
					theme={success ? "success" : ""}
					text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
					onClose={() => {
						setSent(false);
						setSuccess(false);
					}}
				/>
			)}

			<form onSubmit={handleSubmit}>
				{/* Name field */}
				<InputField
					required={true}
					type="text"
					name="personName"
					min="3"
					label="Jméno"
					prompt="Zadejte celé jméno"
					value={person.name}
					handleChange={(e) => {
						setPerson({ ...person, name: e.target.value });
					}}
				/>

				{/* Identification number (IČO) */}
				<InputField
					required={true}
					type="text"
					name="identificationNumber"
					min="3"
					label="IČO"
					prompt="Zadejte IČO"
					value={person.identificationNumber}
					handleChange={(e) => {
						setPerson({ ...person, identificationNumber: e.target.value });
					}}
				/>

				{/* Tax number (DIČ) */}
				<InputField
					required={true}
					type="text"
					name="taxNumber"
					min="3"
					label="DIČ"
					prompt="Zadejte DIČ"
					value={person.taxNumber}
					handleChange={(e) => {
						setPerson({ ...person, taxNumber: e.target.value });
					}}
				/>

				{/* Bank account number */}
				<InputField
					required={true}
					type="text"
					name="accountNumber"
					min="3"
					label="Číslo bankovního účtu"
					prompt="Zadejte číslo bankovního účtu"
					value={person.accountNumber}
					handleChange={(e) => {
						setPerson({ ...person, accountNumber: e.target.value });
					}}
				/>

				{/* Bank code */}
				<InputField
					required={true}
					type="text"
					name="bankCode"
					min="3"
					label="Kód banky"
					prompt="Zadejte kód banky"
					value={person.bankCode}
					handleChange={(e) => {
						setPerson({ ...person, bankCode: e.target.value });
					}}
				/>

				{/* IBAN */}
				<InputField
					required={true}
					type="text"
					name="IBAN"
					min="3"
					label="IBAN"
					prompt="Zadejte IBAN"
					value={person.iban}
					handleChange={(e) => {
						setPerson({ ...person, iban: e.target.value });
					}}
				/>

				{/* Telephone */}
				<InputField
					required={true}
					type="text"
					name="telephone"
					min="3"
					label="Telefon"
					prompt="Zadejte Telefon"
					value={person.telephone}
					handleChange={(e) => {
						setPerson({ ...person, telephone: e.target.value });
					}}
				/>

				{/* Email */}
				<InputField
					required={true}
					type="text"
					name="mail"
					min="3"
					label="Mail"
					prompt="Zadejte mail"
					value={person.mail}
					handleChange={(e) => {
						setPerson({ ...person, mail: e.target.value });
					}}
				/>

				{/* Street */}
				<InputField
					required={true}
					type="text"
					name="street"
					min="3"
					label="Ulice"
					prompt="Zadejte ulici"
					value={person.street}
					handleChange={(e) => {
						setPerson({ ...person, street: e.target.value });
					}}
				/>

				{/* ZIP code */}
				<InputField
					required={true}
					type="text"
					name="ZIP"
					min="3"
					label="PSČ"
					prompt="Zadejte PSČ"
					value={person.zip}
					handleChange={(e) => {
						setPerson({ ...person, zip: e.target.value });
					}}
				/>

				{/* City */}
				<InputField
					required={true}
					type="text"
					name="city"
					min="3"
					label="Město"
					prompt="Zadejte město"
					value={person.city}
					handleChange={(e) => {
						setPerson({ ...person, city: e.target.value });
					}}
				/>

				{/* Optional note */}
				<InputField
					required={true}
					type="text"
					name="note"
					label="Poznámka"
					value={person.note}
					handleChange={(e) => {
						setPerson({ ...person, note: e.target.value });
					}}
				/>

				{/* Country selection */}
				<h6>Země:</h6>

				<InputCheck
					type="radio"
					name="country"
					label="Česká republika"
					value={Country.CZECHIA}
					handleChange={(e) => {
						setPerson({ ...person, country: e.target.value });
					}}
					checked={Country.CZECHIA === person.country}
				/>

				<InputCheck
					type="radio"
					name="country"
					label="Slovensko"
					value={Country.SLOVAKIA}
					handleChange={(e) => {
						setPerson({ ...person, country: e.target.value });
					}}
					checked={Country.SLOVAKIA === person.country}
				/>

				<input type="submit" className="btn btn-success mt-2" value="Uložit" />
			</form>
		</div>
	);
};

export default PersonForm;
