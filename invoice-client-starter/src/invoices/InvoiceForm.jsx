import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";
import { useSession } from "../contexts/session";

const InvoiceForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	// State for the invoice form data
	const [invoice, setInvoice] = useState({
		invoiceNumber: "",
		seller: null,
		buyer: null,
		issued: "",
		dueDate: "",
		product: "",
		price: "",
		vat: "",
		note: ""
	});

	// State for list of persons to choose from (seller and buyer)
	const [persons, setPersons] = useState([]);

	// State to track if the form was submitted
	const [sentState, setSent] = useState(false);

	// State to track if the submission was successful
	const [successState, setSuccess] = useState(false);

	// State to hold error messages if submission fails
	const [errorState, setError] = useState(null);

	// Load invoice data if editing (id present) and persons list on component mount or id change
	useEffect(() => {
		if (id) {
			apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
		}

		apiGet("/api/persons").then((data) => setPersons(data));
	}, [id]);


	// Handle form submission: prepare data and send via POST or PUT
	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Client-side validation
		if (!invoice.seller || !invoice.buyer) {
			setError("Musíte vybrat dodavatele i odběratele.");
			setSent(true);
			setSuccess(false);
			return;
		}

		if (invoice.seller._id === invoice.buyer._id) {
			setError("Nelze vystavit fakturu sám sobě.");
			setSent(true);
			setSuccess(false);
			return;
		}

		if (new Date(invoice.dueDate) < new Date(invoice.issued)) {
			setError("Datum splatnosti nemůže být před datem vystavení.");
			setSent(true);
			setSuccess(false);
			return;
		}

		const preparedInvoice = {
			invoiceNumber: Number(invoice.invoiceNumber),
			seller: { _id: Number(invoice.seller._id) },
			buyer: { _id: Number(invoice.buyer._id) },
			issued: invoice.issued,
			dueDate: invoice.dueDate,
			product: invoice.product,
			price: Number(invoice.price),
			vat: Number(invoice.vat),
			note: invoice.note
		};

		(id ? apiPut("/api/invoices/" + id, preparedInvoice) : apiPost("/api/invoices", preparedInvoice))
			.then((data) => {
				setSent(true);
				setSuccess(true);
				navigate("/invoices"); // Redirect after successful save
			})
			.catch((error) => {
				setError(error.errorData||{message:error.message});
				setSent(true);
				setSuccess(false);
			});
	};

	// Handle input changes in the form
	const handleChange = (e) => {
		const { name, value } = e.target;

		// If value is null or empty string, set field to null in state
		if (!value || value === "") {
			setInvoice((prev) => ({
				...prev,
				[name]: null,
			}));
			return;
		}

		// If value is an object (e.g. from InputSelect), set it directly
		if (typeof value === "object") {
			setInvoice((prev) => ({
				...prev,
				[name]: value,
			}));
			return;
		}

		// Otherwise set value as string or number (from InputField)
		setInvoice((prev) => ({
			...prev,
			[name]: value,
		}));
	};


	const sent = sentState;
	const success = successState;

	// Get session and admin status from context
	const { session } = useSession();
	const isAdmin = session.data?.isAdmin === true;
	const isLoadingSession = session.status === "loading";

	// Redirect users who are not admins
	useEffect(() => {
		if (!isAdmin && !isLoadingSession) {
			if (id) {
				navigate("/invoices/show/" + id);
			} else {
				navigate("/invoices");
			}
		}
	}, [isAdmin, isLoadingSession, id]);

	// Show loading spinner if session is loading or user is not admin
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
			<h1>{id ? "📦 Upravit" : "📦 Vytvořit"} fakturu</h1>
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
			) : errorState ? (
				<div className="alert alert-danger">{errorState}</div>
			) : null}
			
			{sent && (
				<FlashMessage
					theme={success ? "success" : ""}
					text={success ? "Uložení faktury proběhlo úspěšně." : ""}
					onClose={() => {
						setSent(false);
						setSuccess(false);
					}}
				/>
			)}
			<form onSubmit={handleSubmit}>

				<InputField
					required={true}
					type="text"
					name="invoiceNumber"
					label="Číslo faktury"
					prompt="Zadejte číslo faktury"
					value={invoice.invoiceNumber}
					handleChange={(e) => {
						setInvoice({ ...invoice, invoiceNumber: e.target.value });
					}}
				/>

				<InputSelect
					name="seller"
					label="Dodavatel"
					items={persons}
					value={invoice.seller}
					handleChange={handleChange}
					returnObject={true}
				/>

				<InputSelect
					name="buyer"
					label="Odběratel"
					items={persons}
					value={invoice.buyer}
					handleChange={handleChange}
					returnObject={true}
				/>

				<InputField
					required={true}
					type="date"
					name="issued"
					label="Vystaveno"
					prompt="Zadejte datum vystavení faktury"
					value={invoice.issued}
					handleChange={(e) => {
						setInvoice({ ...invoice, issued: e.target.value });
					}}
				/>

				<InputField
					required={true}
					type="date"
					name="dueDate"
					label="Splatnost"
					prompt="Zadejte datum splatnosti faktury"
					value={invoice.dueDate}
					handleChange={(e) => {
						setInvoice({ ...invoice, dueDate: e.target.value });
					}}
				/>

				<InputField
					required={true}
					type="text"
					name="product"
					label="Produkt"
					prompt="Napiště o jaký produkt se jedná"
					value={invoice.product}
					handleChange={(e) => {
						setInvoice({ ...invoice, product: e.target.value });
					}}
				/>

				<InputField
					required={true}
					type="text"
					name="price"
					label="Cena bez DPH"
					prompt="Zadejte cenu bez DPH"
					value={invoice.price}
					handleChange={(e) => {
						setInvoice({ ...invoice, price: e.target.value });
					}}
				/>

				<InputField
					required={true}
					type="text"
					name="vat"
					label="DPH v %"
					prompt="Zadejte DPH"
					value={invoice.vat}
					handleChange={(e) => {
						setInvoice({ ...invoice, vat: e.target.value });
					}}
				/>

				<InputField
					required={true}
					type="text"
					name="note"
					label="Poznámka"
					prompt="Napište poznámku"
					value={invoice.note}
					handleChange={(e) => {
						setInvoice({ ...invoice, note: e.target.value });
					}}
				/>
				<input type="submit" className="btn btn-success mt-3" value="Uložit" />
			</form>
		</div>
	);
};

export default InvoiceForm;
