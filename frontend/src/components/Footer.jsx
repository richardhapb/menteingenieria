import { Link } from "react-router-dom";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import { useContext } from "react";

const Footer = () => {
  const { darkMode } = useContext(GeneralContext);
  return (
    <div
      className={
        "bg-opacity-30 w-full image-linear-xs-f " +
        (!darkMode ? "bg-slate-400" : "")
      }
    >
      <div className="flex flex-col items-center md:flex-row mx-auto justify-between p-8 max-w-screen-lg  gap-y-10 text-center md:text-left ">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold py-2">Contacto</h2>
          <Link
            to="https://www.linkedin.com/in/richard-hapb/"
            target="_blank"
            className="hover:text-slate-400"
          >
            <p>Richard Peña</p>
          </Link>
          <Link to="tel:+56934447286" className="hover:text-slate-400">
            <p>+569 3444 7286</p>
          </Link>
          <Link
            to="mailto:richard.pena@menteingenieria.com"
            className="hover:text-slate-400"
          >
            <p>richard.pena@menteingenieria.com</p>
          </Link>
        </div>
        <div className="flex items-center flex-col gap-4">
          <h2 className="text-2xl font-bold py-2">Visita nuestras redes</h2>
          <div>
            <ul className="flex flex-col gap-3 text-l">
              {/* Icono y red */}
              <li>
                <Link
                  to="https://www.linkedin.com/company/mente-ingenieria"
                  target="_blank"
                >
                  <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                    <img
                      src={`${
                        import.meta.env.VITE_PUBLIC_URL
                      }/assets/linkedin.svg`}
                      alt=""
                      className={"w-8 h-8 " + (!darkMode ? "invert" : "")}
                    />
                    LinkedIn
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/mente.ingenieria/"
                  target="_blank"
                >
                  <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                    <img
                      src={`${
                        import.meta.env.VITE_PUBLIC_URL
                      }/assets/instagram.svg`}
                      alt=""
                      className={"w-8 h-8 " + (!darkMode ? "invert" : "")}
                    />
                    Instagram
                  </div>
                </Link>
              </li>
              <li>
                <Link to="https://x.com/mente_ing" target="_blank">
                  <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                    <img
                      src={`${
                        import.meta.env.VITE_PUBLIC_URL
                      }/assets/twitter.svg`}
                      alt=""
                      className={"w-8 h-8 " + (!darkMode ? "invert" : "")}
                    />
                    X
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
