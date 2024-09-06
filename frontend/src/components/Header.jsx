import Nav from "./Nav.jsx";
import { useLocation } from "react-router-dom";

function Header() {
  return (
    <header>
      {useLocation().pathname === "/" ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
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
      <div className="relative z-10 flex flex-col h-full text-white">
        <Nav />
      </div>
    </header>
  );
}

export default Header;
