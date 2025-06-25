import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceDetail = () => {
	// Extract invoice ID from URL parameters using react-router hook
	const { id } = useParams();

	// Local state to hold invoice data fetched from backend
	const [invoice, setInvoice] = useState(null);

	// On component mount or when 'id' changes, fetch invoice details from API
	useEffect(() => {
		apiGet("/api/invoices/" + id)
			.then((data) => setInvoice(data))       // On success, save data in state
			.catch((error) => console.error(error));  // On failure, log error
	}, [id]);

	// While invoice or related seller/buyer data is missing, show loading message
	if (!invoice || !invoice.seller || !invoice.buyer) {
		return <div>Loading...</div>;
	}

	// Render detailed view of the invoice
	return (
		<div className="container my-5">
			<h2 className="mb-4">📦 Detail faktury</h2>
			<hr />
			<div className="card shadow-sm p-4">
				<h3 className="mb-4">{invoice.product}</h3>
				<div className="row">
					<div className="col-md-6 mb-3">
						<strong>Dodavatel:</strong>
						<div>
							{/* Link to seller's detail page */}
							<Link to={"/persons/show/" + invoice.seller._id} className="custom-link">
								{invoice.seller.name}
							</Link>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Odběratel:</strong>
						<div>
							{/* Link to buyer's detail page */}
							<Link to={"/persons/show/" + invoice.buyer._id} className="custom-link">
								{invoice.buyer.name}
							</Link>
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Vystaveno:</strong>
						<div>{dateStringFormatter(invoice.issued, true)}</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Splatnost:</strong>
						<div>{dateStringFormatter(invoice.dueDate, true)}</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Cena (bez DPH):</strong>
						<div>{invoice.price} Kč</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>DPH:</strong>
						<div>{invoice.vat} %</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Číslo faktury:</strong>
						<div>{invoice.invoiceNumber}</div>
					</div>
					<div className="col-md-6 mb-3">
						<strong>Poznámka:</strong>
						<div>{invoice.note}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoiceDetail;
