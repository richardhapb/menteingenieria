import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Nav = ({ setIsOpen, isOpen, setIsVisible, isVisible }) => {
  const home = useLocation().pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector("header").classList.add("bg-gray-900");
      } else {
        document.querySelector("header").classList.remove("bg-gray-900");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleForm = () => {
    if (isOpen) {
      // Si está abierto, cierra con un pequeño retraso para permitir la transición
      setIsOpen(false);
      setTimeout(() => setIsVisible(false), 500); // 500ms coincide con la duración de la transición
    } else {
      // Si está cerrado, primero lo hacemos visible y luego lo abrimos
      setIsVisible(true);
      setTimeout(() => setIsOpen(true), 10); // Pequeño retraso para permitir que la transición se aplique
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
          <div className="text-2xl font-bold text-gray-800 whitespace-nowrap max-w-48">
            <Link to="/">
              <img src="../src/assets/logo_.png" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex lg:space-x-32 md:space-x-24 flex-grow justify-center">
            <Link to="/" className="text-gray-200 hover:text-gray-300 text-xl">
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-200 hover:text-gray-300 text-xl"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-200 hover:text-gray-300 text-xl"
            >
              About
            </Link>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-100 hover:text-gray-300 focus:outline-none">
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
        </div>
      </nav>
    </div>
  );
};

export default Nav;
