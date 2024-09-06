import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext.jsx";

const Nav = ({ setIsOpen, isOpen, setIsVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);

  const { setContactRequest, home } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Definir el media query para el tamaño "md" (768px)
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Función para manejar el cambio del tamaño de pantalla
    const handleResize = e => {
      setIsMdScreen(e.matches); // Actualiza la variable según el estado de la pantalla
      setMenuVisible(false); // Cierra el menú al cambiar el tamaño de pantalla
      setMenuOpen(false); // Cierra el menú al cambiar el tamaño de pantalla
    };

    // Agregar el event listener para cambios en el tamaño de pantalla
    mediaQuery.addEventListener("change", handleResize);

    // Establecer el estado inicial
    setIsMdScreen(mediaQuery.matches);

    // Limpiar el event listener al desmontar el componente
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const toggleForm = () => {
    if (!home) {
      setContactRequest(true);
      navigate("/");
      return;
    }
    if (isOpen) {
      // Si está abierto, cierra con un pequeño retraso para permitir la transición
      setIsOpen(false);
      setTimeout(() => setIsVisible(false), 500); // 500ms coincide con la duración de la transición
      setContactRequest(false);
    } else {
      // Si está cerrado, primero lo hacemos visible y luego lo abrimos
      setIsVisible(true);
      setTimeout(() => setIsOpen(true), 10); // Pequeño retraso para permitir que la transición se aplique
      setContactRequest(true);
    }
  };

  const toggleMenu = () => {
    if (menuOpen) {
      // Si está abierto, cierra con un pequeño retraso para permitir la transición
      setMenuOpen(false);
      setTimeout(() => setMenuVisible(false), 500); // 500ms coincide con la duración de la transición
    } else {
      // Si está cerrado, primero lo hacemos visible y luego lo abrimos
      setMenuVisible(true);
      setTimeout(() => setMenuOpen(true), 10); // Pequeño retraso para permitir que la transición se aplique
    }
  };

  return (
    <div>
      <nav
        className={
          "w-full px-4 sm:px-6 lg:px-8 bg-opacity-15 bg-gray-600 " +
          (home ? "" : "bg-opacity-20")
        }
      >
        <div className="flex justify-between items-center py-4 flex-col md:flex-row">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 whitespace-nowrap w-1/2 md:max-w-48">
            <Link to="/">
              <img src="../src/assets/logo_.png" alt="Mente Ingeniería" />
            </Link>
          </div>
          <div className="text-center flex flex-col-reverse md:flex-row justify-between items-center flex-grow">
            {/* Navigation Links */}
            {(menuVisible || isMdScreen) && (
              <div
                className={
                  "flex flex-col md:flex-row lg:space-x-32 md:space-x-24 flex-grow justify-center gap-8 md:gap-0 py-4 " +
                  `transition-all duration-500 ease-in-out transform ${
                    menuOpen || isMdScreen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-5"
                  }`
                }
              >
                <Link
                  to="/"
                  className="text-gray-200 hover:text-gray-300 text-2xl md:text-xl"
                >
                  Home
                </Link>
                <Link
                  to="/blog"
                  className="text-gray-200 hover:text-gray-300 text-2xl md:text-xl"
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-gray-300 text-2xl md:text-xl"
                >
                  About
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-gray-100 hover:text-gray-300 focus:outline-none"
                onClick={toggleMenu}
              >
                {/* Mobile menu icon */}
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col my-8 md:my-0">
              <button
                onClick={toggleForm}
                className="text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 whitespace-nowrap bg-aux-color opacity-70 font-bold text-xl w-40"
              >
                {isOpen ? "Cerrar" : "Contáctanos"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
