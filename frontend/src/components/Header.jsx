import Contact from "./Contact.jsx";
import Nav from "./Nav.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext.jsx";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { contactRequest, setContactRequest, home } =
    useContext(GeneralContext);

  useEffect(() => {
    setIsOpen(home && contactRequest);
    setIsVisible(home && contactRequest);
    setContactRequest(false);
  }, [home]);

  return (
    <header className={home ? "relative w-full md:h-screen " : ""}>
      {home ? (
        <video
          className="absolute top-0 left-0 w-full h-full md:h-screen object-cover z-0 opacity-90"
          src="../src/assets/header.mp4"
          alt="Video"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        ""
      )}
      <div
        className={
          "relative z-10 flex flex-col h-full text-white transition-all ease-in-out duration-400"
        }
      >
        <Nav
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
        {/* Texto u otros elementos adicionales */}
        {home && (
          <div className="flex-grow flex items-center justify-between px-8 flex-col-reverse md:flex-row py-6">
            <div className="flex flex-col px-3 max-w-xl gap-10">
              <h1 className="text-5xl font-bold text-center my-8">
                Potencia tu negocio con IA
              </h1>
              <h2 className="text-lg py-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                laudantium vero necessitatibus obcaecati? Libero totam placeat
                praesentium quod quidem beatae architecto molestias itaque
                reiciendis, eum facilis deleniti et neque inventore?
              </h2>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out transform w-3/4 md:w-80 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              }`}
            >
              {home && isVisible && <Contact />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
