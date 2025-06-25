import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

const InvoiceTable = ({ label, items, deleteInvoice }) => {

	// Get session info to determine if user is admin
	const { session } = useSession();
	const isAdmin = session.data?.isAdmin === true;

	return (
		<div className="mt-4">
			{/* Header with invoice count and 'Add New Invoice' button (only for admins) */}
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h5 className="mb-0">
					{label} <span className="badge bg-primary">{items.length}</span>
				</h5>
				{isAdmin ? (
					<Link to="/invoices/create" className="btn btn-success">
						➕ Nová faktura
					</Link>
				) : null}
			</div>

			{/* If no invoices, show alert */}
			{items.length === 0 ? (
				<div className="alert alert-warning">Žádné faktury k zobrazení.</div>
			) : (
				<div className="row">
					{/* Render each invoice card */}
					{items.map((item) => (
						<div className=" col-md-6 col-lg-4 mb-4" key={item._id}>
							<div className="card h-100 shadow-sm">
								<div className="card-body">
									<h5 className="card-title">
										📦 {item.product}
									</h5>
									<p className="card-text">
										<strong>Číslo faktury:</strong> {item.invoiceNumber ?? "—"}<br />
										<strong>Cena:</strong> {item.price?.toLocaleString()} Kč
									</p>
								</div>
								{/* Action buttons: View, Edit, Delete (edit/delete only for admins) */}
								<div className="card-footer d-flex justify-content-between btn-group w-100">
									<Link to={`/invoices/show/${item._id}`} className="btn btn-sm btn-outline-primary">
										Zobrazit
									</Link>
									{isAdmin ? (
										<Link to={`/invoices/edit/${item._id}`} className="btn btn-sm btn-outline-warning">
											Upravit
										</Link>
									) : null}
									{isAdmin ? (
										<button
											onClick={() => deleteInvoice(item._id)}
											className="btn btn-sm btn-outline-danger"
										>
											Odstranit
										</button>
									) : null}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default InvoiceTable;
