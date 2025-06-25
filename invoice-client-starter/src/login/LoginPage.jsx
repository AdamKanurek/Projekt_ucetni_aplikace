import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import { apiPost, HttpRequestError } from "../utils/api";

const LoginPage = () => {

    // Local state for form input values (email and password)
    const [valuesState, setValuesState] = useState({ email: "", password: "" });

    // Access session and navigation functions
    const { session, setSession } = useSession();
    const navigate = useNavigate();

    // Flash message for error/success notifications
    const [flash, setFlash] = useState(null);

    // If already logged in, redirect to homepage
    useEffect(() => {
        if (session.data) {
            navigate("/");
        }
    }, [session]);

    // Handle changes in form inputs
    const handleChange = (e) => {
        const fieldName = e.target.name;
        setValuesState({ ...valuesState, [fieldName]: e.target.value });
    };

    // Handle login form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        apiPost("/api/auth", valuesState)
            .then(data => setSession({ data, status: "authenticated" }))
            .catch(e => {
                // Handle validation or server errors
                if (e instanceof HttpRequestError) {
                    if (e.errorData?.errors) {
                        const errors = e.errorData.errors;
                        const errorMessages = Object.values(errors).join(" ");
                        setFlash({ text: errorMessages, theme: "danger" });
                    } else {
                        const message = e.message;
                        setFlash({ text: message, theme: "danger" });
                    }
                    return;
                }
                // Fallback error message
                setFlash({ text: "Při komunikaci se serverem nastala chyba.", theme: "danger" });
            });
    };

    return (
        <div className="offset-4 col-sm-6 mt-5">
            <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit}>

                {/* Flash message for errors */}
                {flash && (
                    <FlashMessage
                        theme={flash.theme}
                        text={flash.text}
                        onClose={() => setFlash(null)}
                    />
                )}

                {/* Email input field */}
                <InputField
                    type="email"
                    required={true}
                    label="E-mail"
                    handleChange={handleChange}
                    value={valuesState.email}
                    prompt="E-mail"
                    name="email"
                />

                {/* Password input field */}
                <InputField
                    type="password"
                    required={true}
                    label="Heslo"
                    handleChange={handleChange}
                    value={valuesState.password}
                    prompt="Heslo"
                    name="password"
                />

                {/* Submit button */}
                <input
                    type="submit"
                    className="btn btn-outline-primary mt-2"
                    value="Přihlásit se"
                />
            </form>
        </div>
    );
};

export default LoginPage;
