import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Main = () => {
  const { darkMode } = useContext(GeneralContext);

  useEffect(() => {
    const body = document.querySelector("body");
    if (darkMode) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  }, [darkMode]);
  return (
    <main className="mx-auto w-full min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;
