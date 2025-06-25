import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Country from "./Country";
import { apiGet, apiDelete } from "../utils/api";
import { useSession } from "../contexts/session";
import FlashMessage from "../components/FlashMessage";
import PersonInvoicesTable from "./PersonInvoicesTable";

const PersonDetail = () => {
	const { id } = useParams();
	const [person, setPerson] = useState({});
	const [personSales, setPersonSales] = useState([]); // invoices issued by this person
	const [personPurchases, setPersonPurchases] = useState([]); // invoices received from this person
	const { session } = useSession();
	const isAdmin = session.data?.isAdmin === true;
	const [flash, setFlash] = useState(null);

	// Load person details on component mount or when id changes
	useEffect(() => {
		apiGet("/api/persons/" + id)
			.then((data) => setPerson(data))
			.catch((error) => console.error(error));
	}, [id]);

	// Load sales and purchases once person is loaded
	useEffect(() => {
		if (!person || !person.identificationNumber) return;

		apiGet("/api/identification/" + person.identificationNumber + "/sales")
			.then((data) => setPersonSales(data))
			.catch((error) => console.error(error));

		apiGet("/api/identification/" + person.identificationNumber + "/purchases")
			.then((data) => setPersonPurchases(data))
			.catch((error) => console.error(error));
	}, [person]);

	// Determine country name
	const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

	const navigate = useNavigate();

	// Delete the person and navigate away
	const deletePerson = async (id) => {
		try {
			await apiDelete("/api/persons/" + id);
			navigate("/persons");
			setFlash({ text: "Odstranění osobnosti proběhlo úspěšně.", theme: "success" });
		} catch (error) {
			console.log(error.message);
			alert(error.message);
		}
	};

	// Delete a received invoice and update state
	const deleteInvoicePurchases = async (id) => {
		try {
			await apiDelete("/api/invoices/" + id);
			setPersonPurchases(personPurchases.filter((item) => item._id !== id));
			setFlash({ text: "Odstranění přijaté faktury proběhlo úspěšně.", theme: "success" });
		} catch (error) {
			console.log(error.message);
			alert(error.message);
		}
	};

	// Delete an issued invoice and update state
	const deleteInvoiceSales = async (id) => {
		try {
			await apiDelete("/api/invoices/" + id);
			setPersonSales(personSales.filter((item) => item._id !== id));
			setFlash({ text: "Odstranění vystavené faktury proběhlo úspěšně.", theme: "success" });
		} catch (error) {
			console.log(error.message);
			alert(error.message);
		}
	};

	return (
		<div className="container my-5">
			<h2 className="mb-4">👤 Detail osoby</h2>

			<div className="card mb-4 shadow-sm">
				<div className="card-body">
					<h4 className="card-title">
						{person.name} <small className="text-muted">({person.identificationNumber})</small>
					</h4>
					<div className="row">
						<div className="col-md-6">
							<p><strong>DIČ:</strong><br />{person.taxNumber}</p>
							<p><strong>Telefon:</strong><br />{person.telephone}</p>
							<p><strong>E-mail:</strong><br />{person.mail}</p>
							<p><strong>Poznámka:</strong><br />{person.note}</p>
						</div>
						<div className="col-md-6">
							<p>
								<strong>Bankovní účet:</strong><br />
								{person.accountNumber}/{person.bankCode}<br />
								<small className="text-muted">{person.iban}</small>
							</p>
							<p>
								<strong>Sídlo:</strong><br />
								{person.street}, {person.city}, {person.zip}, {country}
							</p>
						</div>
					</div>

					{/* Show edit/delete options only if user is admin */}
					{isAdmin ? (
						<div className="btn-group w-100" role="group">
							<Link to={`/persons/edit/${person._id}`} className="btn btn-outline-warning btn-sm">
								Upravit
							</Link>
							<button
								onClick={() => deletePerson(person._id)}
								className="btn btn-outline-danger btn-sm"
							>
								Odstranit
							</button>
						</div>
					) : null}
				</div>
			</div>

			{/* Flash message for success or error feedback */}
			{flash && (
				<FlashMessage
					text={flash.text}
					theme={flash.theme}
					onClose={() => setFlash(null)}
				/>
			)}

			{/* Issued invoices table */}
			<PersonInvoicesTable
				title="📤 Vystavené faktury"
				invoices={personSales}
				limit={5}
				deleteInvoice={deleteInvoiceSales}
			/>

			{/* Received invoices table */}
			<PersonInvoicesTable
				title="📥 Přijaté faktury"
				invoices={personPurchases}
				limit={5}
				deleteInvoice={deleteInvoicePurchases}
			/>
		</div>
	);
};

export default PersonDetail;
