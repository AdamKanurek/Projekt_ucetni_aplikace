import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, HttpRequestError } from "../utils/api";

// Create a Context with a default value for better IDE support and fallback usage
const SessionContext = createContext({
    session: { data: null, status: "loading" },
    setSession: (data) => { }
});

// Custom hook for easy access to SessionContext anywhere in the component tree
export function useSession() {
    return useContext(SessionContext);
}

// SessionProvider component which wraps app or parts of it to provide session data
export const SessionProvider = ({ children }) => {
    // Local state holds current session data and status ("loading", "authenticated", "unauthenticated")
    const [sessionState, setSessionState] = useState({ data: null, status: "loading" });

    // On mount, call backend to check if user is authenticated
    useEffect(() => {
        apiGet("/api/auth")
            .then(data => setSessionState({ data, status: "authenticated" })) // success: update session data and status
            .catch(e => {
                // If 401 unauthorized error, mark session as unauthenticated
                if (e instanceof HttpRequestError && e.response.status === 401) {
                    setSessionState({ data: null, status: "unauthenticated" });
                } else {
                    // Re-throw unexpected errors
                    throw e;
                }
            });
    }, []);

    // Provide session state and setter to all descendant components
    return (
        <SessionContext.Provider value={{ session: sessionState, setSession: setSessionState }}>
            {children}
        </SessionContext.Provider>
    );
};
