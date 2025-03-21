import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext.jsx";

import { MdLightMode, MdDarkMode } from "react-icons/md";

import { useLocalStorage } from "../hooks/useLocalStorage.js";

/// Handles the navigation bar and make it responsive. Make an animation of slide and
/// listen for user interaction, and decide if should open or close the menu

/// # TODO: Optimize this module and move control to CSS

// eslint-disable-next-line react/prop-types
const Nav = ({ setIsOpen, isOpen, setIsVisible }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isMdScreen, setIsMdScreen] = useState(false);

    const [, setIsDarkMode] = useLocalStorage("darkMode", false);

    const { setContactRequest, home, darkMode, setDarkMode } =
        useContext(GeneralContext);
    const navigate = useNavigate();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        // Handle screen size change
        const handleResize = e => {
            setIsMdScreen(e.matches);
            setMenuVisible(false);
            setMenuOpen(false);
        };

        // Listener for screen size change
        mediaQuery.addEventListener("change", handleResize);

        // Init state
        setIsMdScreen(mediaQuery.matches);

        // Clean
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
            setIsOpen(false);
            setTimeout(() => setIsVisible(false), 500);
            setContactRequest(false);
        } else {
            setIsVisible(true);
            setTimeout(() => setIsOpen(true), 10);
            setContactRequest(true);
        }
    };

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false);
            setTimeout(() => setMenuVisible(false), 500);
        } else {
            setMenuVisible(true);
            setTimeout(() => setMenuOpen(true), 10);
        }
    };

    return (
        <div>
            <nav
                className={
                    "w-full px-4 sm:px-6 lg:px-8 " +
                    (home
                        ? ""
                        : darkMode
                            ? "bg-opacity-15 header-linear"
                            : "bg-slate-400 bg-opacity-30 image-linear-xs-h")
                }
            >
                <div className="relative flex justify-between items-center py-4 flex-col md:flex-row">
                    {/* Logo */}
                    <div
                        className={
                            " text-2xl font-bold whitespace-nowrap w-1/2 md:max-w-48"
                        }
                    >
                        <Link to="/">
                            <img
                                src={`${import.meta.env.VITE_PUBLIC_URL}/assets/logo_.png`}
                                alt="Mente Ingeniería"
                                className={
                                    "z-10" +
                                    (darkMode || home
                                        ? "border-2 border-white border-opacity-20 bg-white bg-opacity-5 image-linear-xs-logo"
                                        : "")
                                }
                            />
                        </Link>
                    </div>
                    <div className="text-center flex flex-col-reverse md:flex-row justify-between items-center flex-grow mb-20 md:mb-0">
                        {/* Navigation Links */}
                        {(menuVisible || isMdScreen) && (
                            <div
                                className={
                                    "flex flex-col md:flex-row lg:space-x-32 md:space-x-24 flex-grow justify-center gap-8 md:gap-0 py-4 " +
                                    `transition-all duration-500 ease-in-out transform ${menuOpen || isMdScreen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 -translate-y-5"
                                    }`
                                }
                            >
                                <Link
                                    to="/"
                                    className={
                                        "text-2xl md:text-xl " +
                                        (darkMode
                                            ? "text-gray-200 hover:text-gray-300"
                                            : !home
                                                ? "text-black hover:text-gray-600"
                                                : "text-gray-200 hover:text-gray-300")
                                    }
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/blog"
                                    className={
                                        "text-2xl md:text-xl " +
                                        (darkMode
                                            ? "text-gray-200 hover:text-gray-300"
                                            : !home
                                                ? "text-black hover:text-gray-600"
                                                : "text-gray-200 hover:text-gray-300")
                                    }
                                >
                                    Blog
                                </Link>
                                <Link
                                    to="/about"
                                    className={
                                        "text-2xl md:text-xl " +
                                        (darkMode
                                            ? "text-gray-200 hover:text-gray-300"
                                            : !home
                                                ? "text-black hover:text-gray-600"
                                                : "text-gray-200 hover:text-gray-300")
                                    }
                                >
                                    About
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden mb-5 md:mb-0">
                            <button
                                className=
                                "focus:outline-none text-gray-100 hover:text-gray-300"
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
                        <div className="flex flex-col md:flex-row gap-8 my-8 md:my-0 items-center">
                            {/* Dark mode icon with react icons */}
                            <button
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                    setIsDarkMode(!darkMode);
                                }}
                                className={
                                    "rounded-lg hover:bg-gray-400 transition duration-300 whitespace-nowrap opacity-70 font-bold text-xl w-10 h-10 text-center flex items-center justify-center " +
                                    (darkMode
                                        ? "bg-gray-200"
                                        : !home
                                            ? "bg-gray-900"
                                            : "bg-gray-200")
                                }
                            >
                                {!darkMode ? (
                                    <MdDarkMode
                                        className={
                                            "text-2xl md:text-xl w-6 h-6 " +
                                            (home
                                                ? "text-gray-900 hover:text-gray-300"
                                                : "text-gray-300 hover:text-gray-900")
                                        }
                                    />
                                ) : (
                                    <MdLightMode
                                        className="text-gray-900 hover:text-gray-300 text-2xl md:text-xl w-6 h-6"
                                        onClick={() => {
                                            setDarkMode(!darkMode);
                                            setIsDarkMode(!darkMode);
                                        }}
                                    />
                                )}
                            </button>
                            <button
                                onClick={toggleForm}
                                className={
                                    "text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 whitespace-nowrap font-bold text-xl w-40 " +
                                    (darkMode
                                        ? "bg-aux-color opacity-70"
                                        : "bg-primary-color text-white border-white border-2")
                                }
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
