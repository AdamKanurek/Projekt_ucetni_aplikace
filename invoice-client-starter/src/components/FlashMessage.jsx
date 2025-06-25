
import { useEffect } from "react";

export function FlashMessage({ theme, text, onClose }) {

	// useEffect sets up a timer to automatically call onClose after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		// Cleanup function to clear the timer if the component unmounts early or dependencies change
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		// Renders a div with a Bootstrap alert class according to the 'theme' prop and displays the 'text'
		<div className={"alert alert-" + theme}>{text}</div>
	);
}

export default FlashMessage;
