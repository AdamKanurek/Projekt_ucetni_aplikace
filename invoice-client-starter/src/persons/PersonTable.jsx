import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

const PersonTable = ({ label, items, deletePerson }) => {
	// Get session info to check if user is admin
	const { session } = useSession();
	const isAdmin = session.data?.isAdmin === true;

	return (
		<div className="my-4">
			{/* Header with label and count, plus create button if admin */}
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h5 className="mb-0">
					{label} <span className="badge bg-primary">{items.length}</span>
				</h5>
				{isAdmin ? (
					<Link to="/persons/create" className="btn btn-success">
						➕ Nová osoba
					</Link>
				) : null}
			</div>

			{/* Show alert if no items */}
			{items.length === 0 ? (
				<div className="alert alert-warning">Žádné osoby k zobrazení.</div>
			) : (
				// List persons in cards
				<div className="row">
					{items.map((item) => (
						<div className="col-md-6 col-lg-4 mb-4" key={item._id}>
							<div className="card h-100 shadow-sm">
								<div className="card-body">
									<h5 className="card-title">👤{item.name}</h5>
									<p className="card-text text-muted mb-3">
										IČO: {item.identificationNumber}
									</p>
									{/* Buttons to show, edit, delete (edit & delete only for admins) */}
									<div className="btn-group w-100" role="group">
										<Link
											to={`/persons/show/${item._id}`}
											className="btn btn-outline-primary btn-sm"
										>
											Zobrazit
										</Link>
										{isAdmin ? (
											<Link
												to={`/persons/edit/${item._id}`}
												className="btn btn-outline-warning btn-sm"
											>
												Upravit
											</Link>
										) : null}
										{isAdmin ? (
											<button
												onClick={() => deletePerson(item._id)}
												className="btn btn-outline-danger btn-sm"
											>
												Odstranit
											</button>
										) : null}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PersonTable;
