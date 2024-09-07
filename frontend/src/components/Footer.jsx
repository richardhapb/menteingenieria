import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center md:flex-row mx-auto justify-between p-8 max-w-screen-lg bg-opacity-0 gap-y-10 text-center md:text-left">
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
              <Link to="#" target="_blank">
                <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                  <img
                    src="../src/assets/linkedin.svg"
                    alt=""
                    className="w-8 h-8"
                  />
                  LinkedIn
                </div>
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                  <img
                    src="../src/assets/instagram.svg"
                    alt=""
                    className="w-8 h-8 "
                  />
                  Instagram
                </div>
              </Link>
            </li>
            <li>
              <Link to="#" target="_blank">
                <div className="flex gap-2 items-center hover:text-slate-400 text-lg">
                  <img
                    src="../src/assets/twitter.svg"
                    alt=""
                    className="w-8 h-8"
                  />
                  X
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
