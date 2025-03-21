import Contact from "./Contact.jsx";
import Nav from "./Nav.jsx";
import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import NewsAI from "./NewsAI.jsx";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { contactRequest, setContactRequest, home, darkMode } =
        useContext(GeneralContext);

    useEffect(() => {
        setIsOpen(home && contactRequest);
        setIsVisible(home && contactRequest);
        setContactRequest(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [home]);

    return (
        <header className={home ? "relative w-full overflow-hidden  " : ""}>
            {home ? (
                <video
                    className={
                        "absolute top-0 left-0 w-full h-full object-cover z-0 " +
                        (darkMode ? "image-linear-s" : "")
                    }
                    src={`${import.meta.env.VITE_PUBLIC_URL}/assets/header.mp4`}
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
                    "z-10 flex flex-col h-full text-white" + (home ? "min-h-[700px]" : "")
                }
            >
                <Nav
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    setIsVisible={setIsVisible}
                    isVisible={isVisible}
                />
                {home && (
                    <div className="flex-grow flex items-center justify-between px-8 flex-col-reverse md:flex-row py-6 z-20">
                        <div className="flex flex-col px-3 max-w-xl gap-10 text-white">
                            <h1 className="text-5xl font-bold text-center my-8">
                                Impulsa tu negocio con nosotros
                            </h1>
                            <h2 className="text-lg py-2">
                                Juntos, llevamos tus procesos a la excelencia, optimizando cada
                                etapa con inteligencia artificial y ciencia de datos. Aumenta la
                                eficiencia y toma decisiones estratégicas basadas en datos para
                                un crecimiento sostenible y rentable.
                            </h2>
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out transform w-3/4 md:w-80 z-30 ${isOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-5"
                                }`}
                        >
                            {home && isVisible ? <Contact /> : ""}
                        </div>

                        {home && !isVisible ? <NewsAI /> : ""}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
