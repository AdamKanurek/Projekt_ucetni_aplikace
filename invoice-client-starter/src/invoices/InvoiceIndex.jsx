import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";
import FlashMessage from "../components/FlashMessage";

const InvoiceIndex = () => {
	// State for invoices data
	const [invoices, setInvoices] = useState([]);

	// State for lists of buyers and sellers for filtering
	const [buyerList, setBuyerList] = useState([]);
	const [sellerList, setSellerList] = useState([]);

	// Pagination states: current page and total pages available
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	// States for showing feedback messages after actions (e.g. delete)
	const [sentState, setSent] = useState(false);
	const [successState, setSuccess] = useState(false);

	// State for filtering invoices
	const [filter, setFilter] = useState({
		buyerID: undefined,
		sellerID: undefined,
		product: undefined,
		minPrice: undefined,
		maxPrice: undefined,
		limit: undefined
	});

	// Load invoices and persons lists on component mount
	useEffect(() => {
		loadInvoices(0, filter, false);
		apiGet("/api/persons").then((data) => {
			setBuyerList(data);
			setSellerList(data);
		});
	}, []);

	// Function to load invoices, optionally appending to existing list
	const loadInvoices = async (pageToLoad = 0, currentFilter = filter, append = false) => {
		const params = {
			...currentFilter,
			page: pageToLoad,
			limit: currentFilter.limit,
		};
		const data = await apiGet("/api/invoices", params);

		// Append new invoices or replace list depending on 'append' flag
		if (append) {
			setInvoices(prev => [...prev, ...data.content]);
		} else {
			setInvoices(data.content);
		}

		setTotalPages(data.totalPages);
	};

	// Handle filter form submission: reload invoices from first page
	const handleSubmit = async (e) => {
		e.preventDefault();
		setPage(0);
		await loadInvoices(0, filter, false);
	};

	// Handle filter input changes and update filter state
	const handleChange = (e) => {
		// Convert false/true/empty string to undefined to reset filter fields
		if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
			setFilter(prevState => ({
				...prevState,
				[e.target.name]: undefined
			}));
		} else {
			setFilter(prevState => ({
				...prevState,
				[e.target.name]: e.target.value
			}));
		}
	};

	// Reset all filters and reload invoices
	const handleReset = async () => {
		const emptyFilter = {
			buyerID: undefined,
			sellerID: undefined,
			product: undefined,
			minPrice: undefined,
			maxPrice: undefined,
			limit: undefined
		};

		setFilter(emptyFilter);
		setPage(0);
		await loadInvoices(0, emptyFilter, false);
	};

	// Load next page of invoices and append to current list
	const loadMore = async () => {
		const nextPage = page + 1;
		await loadInvoices(nextPage, filter, true);
		setPage(nextPage);
	};

	const sent = sentState;
	const success = successState;

	// Delete an invoice by id and update state with success/error feedback
	const deleteInvoice = async (id) => {
		try {
			await apiDelete("/api/invoices/" + id);
			// Remove deleted invoice from the list
			setInvoices(invoices.filter((item) => item._id !== id));
			setSent(true);
			setSuccess(true);
		} catch (error) {
			console.log(error.message);
			alert(error.message);
			setSent(true);
			setSuccess(false);
		}
	};

	return (
		<div className="container my-4">
			<h1>📋 Seznam faktur</h1>
			<hr />

			{/* Filter form for invoices */}
			<InvoiceFilter
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleReset={handleReset}
				buyerList={buyerList}
				sellerList={sellerList}
				filter={filter}
			/>

			<hr />

			{/* Flash message for delete success or failure */}
			{sent && (
				<FlashMessage
					theme={success ? "success" : ""}
					text={success ? "Odstranění faktury bylo úspěšné." : ""}
					onClose={() => {
						setSent(false);
						setSuccess(false);
					}}
				/>
			)}

			{/* Table listing the invoices */}
			<InvoiceTable
				deleteInvoice={deleteInvoice}
				items={invoices}
				label="Počet faktur"
			/>

			{/* Button to load more invoices if available */}
			{page + 1 < totalPages && (
				<div className="text-center mt-3">
					<button className="btn btn-outline-secondary" onClick={loadMore}>
						Zobrazit více
					</button>
				</div>
			)}
		</div>
	);
};

export default InvoiceIndex;
