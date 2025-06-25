import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const StatisticsOverview = () => {
	// State to hold invoice statistics data
	const [invoicesStats, setInvoicesStats] = useState([]);

	useEffect(() => {
		// Fetch statistics from the API once component mounts
		apiGet("/api/invoices/statistics")
			.then((data) => setInvoicesStats(data))
			.catch(console.error);
	}, []);

	return (
		<div className="container mt-4">
			<h3 className="mb-4">📊 Celkové statistiky</h3>
			<div className="row text-center g-4">

				{/* Current year invoice sum */}
				<div className="col-md-4">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title text-muted">Tento rok</h5>
							<div className="display-6 fw-bold">
								{invoicesStats.currentYearSum?.toLocaleString("cs-CZ")} Kč
							</div>
							<div className="text-muted small mt-2">Hodnota faktur vystavených letos</div>
						</div>
					</div>
				</div>

				{/* All-time invoice sum */}
				<div className="col-md-4">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title text-muted">Celkem</h5>
							<div className="display-6 fw-bold">
								{invoicesStats.allTimeSum?.toLocaleString("cs-CZ")} Kč
							</div>
							<div className="text-muted small mt-2">Hodnota všech vystavených faktur</div>
						</div>
					</div>
				</div>

				{/* Total count of invoices */}
				<div className="col-md-4">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-body">
							<h5 className="card-title text-muted">Počet faktur</h5>
							<div className="display-6 fw-bold">{invoicesStats.invoicesCount || 0}</div>
							<div className="text-muted small mt-2">Celkový počet vystavených faktur</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default StatisticsOverview;
