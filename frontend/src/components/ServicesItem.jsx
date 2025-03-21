import { useEffect, useRef, useState, useContext } from "react";
import {
    FaSearch,
    FaChartBar,
    FaRobot,
    FaCogs,
    FaBrain,
    FaTasks
} from "react-icons/fa";
import { GeneralContext } from "../contexts/GeneralContext";

/// Handles the rendering and animation of services in center of the home page
/// make an horizontal animation and use a custom icon for each service

// TODO: Make the service names from database and their associated icons
// for making it dynamic and flexible for future changes.

// eslint-disable-next-line react/prop-types
const ServicesItem = ({ name: name, description: description }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const { darkMode } = useContext(GeneralContext);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const servicesList = [
        { name: "Investigación de operaciones", icon: <FaSearch />, location: "l" },
        { name: "Inteligencia de negocios", icon: <FaChartBar />, location: "r" },
        { name: "Machine Learning", icon: <FaRobot />, location: "l" },
        { name: "Inteligencia Artificial", icon: <FaBrain />, location: "r" },
        { name: "Optimización de procesos", icon: <FaCogs />, location: "l" },
        { name: "Automatización de procesos", icon: <FaTasks />, location: "r" }
    ];

    const serv = servicesList.find(ser => ser.name === name);

    return (
        <div
            ref={ref}
            className={` flex flex-col items-center gap-10 p-10 text-l transition-all duration-[1400ms] ease-in-out ${serv.location === "r"
                ? "md:flex-row-reverse rounded-md bg-opacity-10 horizontal-linear-l " +
                (darkMode ? "bg-slate-400 " : "bg-slate-950 ")
                : "md:flex-row horizontal-linear-r "
                } ${isVisible
                    ? "translate-x-0 opacity-100"
                    : serv.location === "l"
                        ? "-translate-x-20 opacity-0"
                        : "translate-x-20 opacity-0"
                }
      ${darkMode ? "text-white" : "text-black"}`}
        >
            <div
                className={`text-7xl ${serv.location === "l" ? "text-sky-500" : "text-red-400"
                    }`}
            >
                {serv.icon}
            </div>
            <div
                className={`flex items-center flex-col ${serv.location === "r" ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
            >
                <h3 className="text-3xl p-2">{name}</h3>
                <p className="px-6">{description}</p>
            </div>
        </div>
    );
};

export default ServicesItem;
