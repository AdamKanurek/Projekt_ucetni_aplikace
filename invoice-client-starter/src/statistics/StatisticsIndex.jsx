import { Link } from "react-router-dom";

const StatisticsIndex = () => {

    // Main page for statistics with navigation cards
    return (
        <div className="container my-4">
            <h1>📈 Statistiky</h1>
            <div className="row mt-3 g-4 justify-content-center">

                {/* Card for overall statistics */}
                <div className="col-lg-6">
                    <div className="card border-primary shadow-sm h-100">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h4 className="card-title text-primary mb-3">
                                    <i className="bi bi-bar-chart-line-fill me-2"></i>
                                    Celkové statistiky
                                </h4>
                                <p className="card-text text-muted">
                                    Přehled o celkové hodnotě a počtu faktur.
                                </p>
                            </div>
                            <Link to="/statistics/overview" className="btn btn-outline-primary mt-3 align-self-start">
                                Zobrazit přehled
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card for company/person statistics */}
                <div className="col-lg-6">
                    <div className="card border-success shadow-sm h-100">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h4 className="card-title text-success mb-3">
                                    <i className="bi bi-building me-2"></i>
                                    Statistiky firem
                                </h4>
                                <p className="card-text text-muted">
                                    Detailní statistiky jednotlivých firem a jejich tržeb.
                                </p>
                            </div>
                            <Link to="/statistics/persons" className="btn btn-outline-success mt-3 align-self-start">
                                Zobrazit statistiky
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticsIndex;
