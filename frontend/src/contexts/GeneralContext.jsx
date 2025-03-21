import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export const GeneralContext = createContext();

/// General context for handling the global states like dark mode

/// TODO: Separate Context and Provider

const GeneralContextProvider = ({ children }) => {
    const [contactRequest, setContactRequest] = useState(false);
    const [home, setHome] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const dark = localStorage.getItem("darkMode");
        if (dark) {
            setDarkMode(JSON.parse(dark));
        }
    }, []);

    useEffect(() => {
        setHome(location.pathname === "/");
    }, [location]);

    return (
        <GeneralContext.Provider
            value={{
                contactRequest,
                setContactRequest,
                darkMode,
                setDarkMode,
                home
            }}
        >
            {children}
        </GeneralContext.Provider>
    );
};
export default GeneralContextProvider;
