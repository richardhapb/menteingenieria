import Contact from "./Contact.jsx";
import Nav from "./Nav.jsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const home = useLocation().pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header className={home && "relative w-full h-screen"}>
      {home ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-90"
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
          <div className="flex-grow flex items-center justify-between px-8">
            <div className="flex flex-col px-3 max-w-xl gap-10">
              <h1 className="text-5xl font-bold text-center">
                Potencia tu negocio con IA
              </h1>
              <h2 className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                laudantium vero necessitatibus obcaecati? Libero totam placeat
                praesentium quod quidem beatae architecto molestias itaque
                reiciendis, eum facilis deleniti et neque inventore?
              </h2>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5 pointer-events-none"
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
