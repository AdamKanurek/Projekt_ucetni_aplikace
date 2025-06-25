import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";

const PAGE_LIMIT = 15;

const PersonsStatistics = () => {
	// State to store loaded statistics
	const [personsStats, setPersonsStats] = useState([]);
	// Current page for pagination
	const [page, setPage] = useState(0);
	// Flag to check if more data is available
	const [hasMore, setHasMore] = useState(true);
	// Loading state to prevent duplicate requests
	const [loading, setLoading] = useState(false);

	// Function to load statistics for a given page
	const loadStats = async (pageToLoad) => {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			// Fetch data from API with pagination params
			const data = await apiGet("/api/persons/statistics", {
				limit: PAGE_LIMIT,
				page: pageToLoad,
			});

			// If fewer results than page limit, no more pages
			if (data.length < PAGE_LIMIT) {
				setHasMore(false);
			}

			// Add new stats without duplicates
			setPersonsStats((prev) => {
				const existingIds = new Set(prev.map((p) => p._id));
				const newItems = data.filter((p) => !existingIds.has(p._id));
				return [...prev, ...newItems];
			});

			setPage(pageToLoad);
		} catch (error) {
			console.error(error);
			alert("Chyba při načítání statistik");
		} finally {
			setLoading(false);
		}
	};

	// Load first page on component mount
	useEffect(() => {
		loadStats(0);
	}, []);

	return (
		<div className="container my-5">
			<h3 className="mb-4">📊 Statistiky jednotlivých firem</h3>

			{personsStats.length === 0 ? (
				<div className="alert alert-warning">Žádné statistiky firem k zobrazení.</div>
			) : (
				<>
					<div className="row g-4">
						{personsStats.map((person) => (
							<div className="col-md-6 col-lg-4" key={person.identificationNumber}>
								<div className="card h-100 shadow-sm border-0">
									<div className="card-body">
										<h5 className="card-title">
											<Link to={`/persons/show/${person._id}`} className="custom-link">
												{person.personName}
											</Link>
											<small className="text-muted">
												({person.identificationNumber})
											</small>
										</h5>
										<div className="text-muted small mt-2">Tržba</div>
										<div className="display-6 fw-bold">
											{person.revenue.toLocaleString("cs-CZ")} Kč
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Show "Load more" button if there are more stats */}
					{hasMore && (
						<div className="text-center mt-4">
							<button
								className="btn btn-outline-secondary"
								onClick={() => loadStats(page + 1)}
								disabled={loading}
							>
								{loading ? "Načítám..." : "Zobrazit více"}
							</button>
						</div>
					)}

					{/* Message when all records are loaded */}
					{!hasMore && personsStats.length > 0 && (
						<p className="text-center text-muted mt-3">Všechny záznamy načteny.</p>
					)}
				</>
			)}
		</div>
	);
};

export default PersonsStatistics;
