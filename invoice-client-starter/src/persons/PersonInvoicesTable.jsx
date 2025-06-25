import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

const PersonInvoicesTable = ({ title, invoices, limit, deleteInvoice }) => {
    // Limit invoices to show if limit prop is provided
    const visibleInvoices = limit ? invoices.slice(0, limit) : invoices;

    // Access session context to check admin rights
    const { session } = useSession();
    const isAdmin = session.data?.isAdmin === true;

    return (
        <div className="my-5">
            {/* Section title with count badge */}
            <h4 className="mb-3">{title} <span className="badge bg-primary">{visibleInvoices.length}</span></h4>

            {/* Show warning if no invoices to display */}
            {visibleInvoices.length === 0 ? (
                <div className="alert alert-warning">Žádné záznamy k zobrazení.</div>
            ) : (
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over invoices to create rows */}
                        {visibleInvoices.map((invoice, index) => (
                            <tr key={invoice._id}>
                                <td>{index + 1}</td>
                                <td>{invoice.product}</td>
                                <td>{invoice.price}</td>
                                <td>
                                    <div className="btn-group w-100">
                                        {/* Link to view invoice */}
                                        <Link to={`/invoices/show/${invoice._id}`} className="btn btn-sm btn-outline-primary">
                                            Zobrazit
                                        </Link>

                                        {/* Show edit button only for admins */}
                                        {isAdmin ? (
                                            <Link to={`/invoices/edit/${invoice._id}`} className="btn btn-sm btn-outline-warning">
                                                Upravit
                                            </Link>
                                        ) : null}

                                        {/* Show delete button only for admins */}
                                        {isAdmin ? (
                                            <button
                                                onClick={() => deleteInvoice(invoice._id)}
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                Odstranit
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PersonInvoicesTable;
