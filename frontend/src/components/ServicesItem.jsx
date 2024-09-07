import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaChartBar,
  FaRobot,
  FaCogs,
  FaBrain,
  FaTasks
} from "react-icons/fa";

const ServicesItem = ({ nombre, descripcion }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
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

  const serv = servicesList.find(ser => ser.name === nombre);

  return (
    <div
      ref={ref}
      className={`text-white flex flex-col items-center gap-10 p-10 text-l transition-all duration-[1400ms] ease-in-out ${
        serv.location === "r"
          ? "md:flex-row-reverse bg-slate-400 rounded-md bg-opacity-10 horizontal-linear-l"
          : "md:flex-row horizontal-linear-r"
      } ${
        isVisible
          ? "translate-x-0 opacity-100"
          : serv.location === "l"
          ? "-translate-x-20 opacity-0"
          : "translate-x-20 opacity-0"
      }`}
    >
      <div
        className={`text-7xl ${
          serv.location === "l" ? "text-sky-500" : "text-red-400"
        }`}
      >
        {serv.icon}
      </div>
      <div
        className={`flex items-center flex-col ${
          serv.location === "r" ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <h3 className="text-3xl p-2">{nombre}</h3>
        <p className="px-6">{descripcion}</p>
      </div>
    </div>
  );
};

export default ServicesItem;
