import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";

const PAGE_LIMIT = 15;

const PersonIndex = () => {
	// State for list of persons
	const [persons, setPersons] = useState([]);
	// State for current page number
	const [page, setPage] = useState(0);
	// Flag if more persons are available to load
	const [hasMore, setHasMore] = useState(true);
	// Loading indicator flag
	const [loading, setLoading] = useState(false);
	// Flash message state
	const [flash, setFlash] = useState(null);

	// Function to load persons with pagination
	const loadPersons = async (pageToLoad) => {
		if (loading || !hasMore) return; // Prevent duplicate loading or if no more data

		setLoading(true);
		try {
			// Fetch persons from API with limit and page query params
			const data = await apiGet("/api/persons", {
				limit: PAGE_LIMIT,
				page: pageToLoad
			});

			// If fewer results than limit, no more pages available
			if (data.length < PAGE_LIMIT) {
				setHasMore(false);
			}

			// Merge new persons with existing ones without duplicates
			setPersons((prev) => {
				const existingIds = new Set(prev.map((p) => p._id));
				const newPersons = data.filter((p) => !existingIds.has(p._id));
				return [...prev, ...newPersons];
			});

			setPage(pageToLoad); // Update current page state
		} catch (error) {
			console.error(error);
			alert("Chyba při načítání osob");
		} finally {
			setLoading(false);
		}
	};

	// Load first page on component mount
	useEffect(() => {
		loadPersons(0);
	}, []);

	// Function to delete a person by id
	const deletePerson = async (id) => {
		try {
			await apiDelete("/api/persons/" + id);
			// Remove deleted person from state list
			setPersons((persons) => persons.filter((item) => item._id !== id));
			setFlash({ text: "Odstranění osobnosti proběhlo úspěšně.", theme: "success" })
		} catch (error) {
			console.log(error.message);
			alert(error.message);
		}
	};

	return (
		<div className="container my-4">
			<h1>📋 Seznam osob</h1>

			{flash && (
				<FlashMessage
					theme={flash.theme}
					text={flash.text}
					onClose={() => setFlash(null)}
				/>
			)}

			<PersonTable deletePerson={deletePerson} items={persons} label="Počet osob:" />

			{/* Show button to load more if available */}
			{hasMore && (
				<div className="text-center mt-4">
					<button
						className="btn btn-outline-secondary"
						onClick={() => loadPersons(page + 1)}
						disabled={loading}
					>
						{loading ? "Načítám..." : "Zobrazit více"}
					</button>
				</div>
			)}

			{/* Message when all records loaded */}
			{!hasMore && persons.length > 0 && (
				<p className="text-center text-muted mt-3">Všechny záznamy načteny.</p>
			)}

		</div>
	);
};

export default PersonIndex;
