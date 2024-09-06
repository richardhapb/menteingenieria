const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row mx-auto justify-between p-8 max-w-screen-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold py-2">Contacto</h2>
        <p>Richard Peña</p>
        <p>+569 3444 7286</p>
        <p>richard.pena@menteingenieria.com</p>
      </div>
      <div className="flex items-center flex-col gap-3">
        <h2 className="text-2xl font-bold py-2">Visita nuestras redes</h2>
        <div>LinkedIn</div>
      </div>
    </div>
  );
};

export default Footer;
