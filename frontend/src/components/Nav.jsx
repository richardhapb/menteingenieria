import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Nav = () => {
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

  return (
    <div>
      <nav
        className={
          "w-full px-4 sm:px-6 lg:px-8 bg-opacity-15 " +
          (home ? "bg-gray-600" : "bg-gray-600 bg-opacity-30")
        }
      >
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 whitespace-nowrap max-w-48">
            <Link to="/">
              <img src="../src/assets/logo_.png" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-32 flex-grow justify-center">
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
          <div className="hidden md:flex">
            <Link
              to="#signup"
              className="text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 whitespace-nowrap bg-gray-900 opacity-70 font-bold text-xl"
            >
              Contáctanos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-800 hover:text-gray-900 focus:outline-none">
              {/* Mobile menu icon */}
              <svg
                className="w-6 h-6"
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
