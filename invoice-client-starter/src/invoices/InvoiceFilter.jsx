import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = (props) => {

	// Handle input/select changes by forwarding event up to parent component
	const handleChange = (e) => {
		props.handleChange(e);
	};

	// Handle form submission by forwarding event up to parent component
	const handleSubmit = (e) => {
		props.handleSubmit(e);
	};

	// Destructure filter object from props for easier access
	const filter = props.filter;

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				{/* Seller dropdown */}
				<div className="col">
					<InputSelect
						name="sellerID"
						items={props.sellerList}
						handleChange={handleChange}
						label="Dodavatel"
						value={filter.sellerID}
						returnObject={false}
					/>
				</div>

				{/* Buyer dropdown */}
				<div className="col">
					<InputSelect
						name="buyerID"
						items={props.buyerList}
						handleChange={handleChange}
						label="Odběratel"
						value={filter.buyerID}
						returnObject={false}
					/>
				</div>

				{/* Product text input */}
				<div className="col">
					<InputField
						required={false}
						type="text"
						name="product"
						label="Produkt"
						value={filter.product}
						handleChange={handleChange}
					/>
				</div>
			</div>

			<div className="row">
				{/* Minimum price input */}
				<div className="col">
					<InputField
						type="number"
						min="0"
						name="minPrice"
						handleChange={handleChange}
						label="Minimální částka"
						prompt="neuveden"
						value={filter.minPrice ? filter.minPrice : ''}
					/>
				</div>

				{/* Maximum price input */}
				<div className="col">
					<InputField
						type="number"
						min="0"
						name="maxPrice"
						handleChange={handleChange}
						label="Maximalní částka"
						prompt="neuveden"
						value={filter.maxPrice ? filter.maxPrice : ''}
					/>
				</div>

				{/* Limit input */}
				<div className="col">
					<InputField
						type="number"
						min="1"
						name="limit"
						handleChange={handleChange}
						label="Limit počtu faktur"
						prompt="neuveden"
						value={filter.limit ? filter.limit : ''}
					/>
				</div>
			</div>

			{/* Buttons for submit and reset */}
			<div className="d-flex justify-content-between">
				<div>
					<button
						type="button"
						onClick={props.handleReset}
						className="btn btn-outline-danger mt-2 me-1"
					>
						Reset filtru
					</button>
				</div>
				<div>
					<input
						type="submit"
						className="btn btn-success mt-2 ms-1"
						value="Filtrovat"
					/>
				</div>
			</div>
		</form>
	);
};

export default InvoiceFilter;
