import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [contactRequest, setContactRequest] = useState(false);
  const [home, setHome] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setHome(location.pathname === "/");
  }, [location]);

  return (
    <GeneralContext.Provider
      value={{
        contactRequest,
        setContactRequest,
        home
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
export default GeneralContextProvider;
