import { apiPost, HttpRequestError } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";

const RegistrationPage = () => {
    const nav = useNavigate();
    // State to store form inputs
    const [valuesState, setValuesState] = useState({ password: "", confirmPassword: "", email: "" });
    // State to show flash messages (errors/success)
    const [flash, setFlash] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (valuesState.password !== valuesState.confirmPassword) {
            setFlash({ text: "Hesla se nerovnají", theme: "danger" });
            return;
        }
        // Prepare data excluding confirmPassword for API
        const { confirmPassword, ...registrationData } = valuesState;
        apiPost("/api/user", registrationData)
            .then(() => {
                // Navigate to login page on successful registration
                nav("/login");
            })
            .catch(e => {
                if (e instanceof HttpRequestError) {
                    if (e.errorData?.errors) {
                        // Collect all error messages from backend validation
                        const errors = e.errorData.errors;
                        const errorMessages = Object.values(errors).join(" ");
                        setFlash({ text: errorMessages, theme: "danger" });
                    } else {
                        const message = e.message;
                        setFlash({ text: message, theme: "danger" });
                    }
                    return;
                }
                // Generic error message for communication issues
                setFlash({ text: "Při komunikaci se serverem nastala chyba.", theme: "danger" });
            });
    };

    // Update form values on input change
    const handleChange = (e) => {
        const fieldName = e.target.name;
        setValuesState({ ...valuesState, [fieldName]: e.target.value });
    };

    return (
        <div className="offset-4 col-sm-6 mt-5">
            <h1>Registrace</h1>
            <form onSubmit={handleSubmit}>

                {/* Show flash messages if present */}
                {flash && (
                    <FlashMessage
                        theme={flash.theme}
                        text={flash.text}
                        onClose={() => setFlash(null)}
                    />
                )}

                {/* Email input */}
                <InputField
                    type="email"
                    name="email"
                    label="E-mail"
                    prompt="Zadejte Váš E-mail"
                    value={valuesState.email}
                    handleChange={handleChange}
                />

                {/* Password input */}
                <InputField
                    type="password"
                    name="password"
                    label="Heslo"
                    prompt="Zadejte Vaše heslo"
                    min={6}
                    value={valuesState.password}
                    handleChange={handleChange}
                />

                {/* Confirm password input */}
                <InputField
                    type="password"
                    name="confirmPassword"
                    label="Heslo znovu"
                    prompt="Zadejte Vaše heslo znovu"
                    value={valuesState.confirmPassword}
                    handleChange={handleChange}
                />

                {/* Submit button */}
                <input type="submit" className="btn btn-outline-primary mt-2" value="Registrovat se" />
            </form>
        </div>
    );
}

export default RegistrationPage;
