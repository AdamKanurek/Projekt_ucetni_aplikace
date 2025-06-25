import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatisticsIndex from "./statistics/StatisticsIndex";
import StatisticsOverview from "./statistics/StatisticsOverview";
import StatisticsPersons from "./statistics/PersonsStatistics";
import RegistrationPage from "./registration/RegistrationPage";
import LoginPage from "./login/LoginPage";
import { useSession } from "./contexts/session";
import { apiDelete } from "./utils/api";

export function App() {

	const { session, setSession } = useSession();

	// Handles user logout by calling DELETE on /api/auth endpoint,
	// then resetting the session state to unauthorized
	const handleLogoutClick = () => {
		apiDelete("/api/auth")
			.finally(() => setSession({ data: null, status: "unauthorized" }));
	}

	return (
		<Router>
			<div className="app-wrapper">
				{/* Navigation bar */}
				<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
					<div className="container-fluid">
						{/* Brand / Home link */}
						<Link className="navbar-brand" to="/">📁 Fakturační systém</Link>

						{/* Hamburger menu button for collapsing navbar on small screens */}
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
							<span className="navbar-toggler-icon"></span>
						</button>

						{/* Navbar links and user actions */}
						<div className="d-flex justify-content-between collapse navbar-collapse" id="navbarNav">
							{/* Left side nav links */}
							<ul className="navbar-nav">
								<li className="nav-item">
									{/* Navigation link to Persons section */}
									<Link to="/persons" className="nav-link" activeclassname="active">
										👤 Osoby
									</Link>
								</li>
								<li className="nav-item">
									{/* Navigation link to Invoices section */}
									<Link to="/invoices" className="nav-link" activeclassname="active">
										🧾 Faktury
									</Link>
								</li>
								<li className="nav-item">
									{/* Navigation link to Statistics section */}
									<Link to="/statistics" className="nav-link" activeclassname="active">
										📊 Statistiky
									</Link>
								</li>
							</ul>

							{/* Right side user session controls */}
							<ul className="navbar-nav align-items-center gap-2">
								{session.data ? (
									// If user is logged in, show email and logout button
									<>
										<li className="nav-item">{session.data.email}</li>
										<li className="nav-item">
											<button className="btn btn-sm btn-secondary" onClick={handleLogoutClick}>Odhlásit se</button>
										</li>
									</>
								) : session.status === "loading" ? (
									// If session is loading, show spinner
									<>
										<div className="spinner-border spinner-border-sm" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									</>
								) : (
									// If no user logged in, show links to register and login
									<>
										<li className="nav-item">
											<Link to={"/register"} className="nav-link" activeclassname="active">📝 Registrace</Link>
										</li>
										<li className="nav-item">
											<Link to={"/login"} className="nav-link" activeclassname="active">🔑 Přihlásit se</Link>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>
				</nav>

				{/* Main content area where routed components render */}
				<main className="container my-4">
					<Routes>
						{/* Redirect root path to /persons */}
						<Route path="/" element={<Navigate to="/persons" />} />

						{/* Routes for Persons section */}
						<Route path="/persons">
							<Route index element={<PersonIndex />} />
							<Route path="show/:id" element={<PersonDetail />} />
							<Route path="create" element={<PersonForm />} />
							<Route path="edit/:id" element={<PersonForm />} />
						</Route>

						{/* Routes for Invoices section */}
						<Route path="/invoices">
							<Route index element={<InvoiceIndex />} />
							<Route path="show/:id" element={<InvoiceDetail />} />
							<Route path="create" element={<InvoiceForm />} />
							<Route path="edit/:id" element={<InvoiceForm />} />
						</Route>

						{/* Routes for Statistics section */}
						<Route path="/statistics">
							<Route index element={<StatisticsIndex />} />
							<Route path="overview" element={<StatisticsOverview />} />
							<Route path="persons" element={<StatisticsPersons />} />
						</Route>

						{/* Registration and Login pages */}
						<Route path="/register" element={<RegistrationPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>

				<footer className="bg-light text-center text-muted py-3 mt-auto border-top">
					<small>&copy; 2025 Fakturační aplikace | Vytvořeno s ❤️ v Reactu | by AdamK</small>
				</footer>
			</div>
		</Router>
	);
}

export default App;
