const Contact = () => {
  return (
    <div className=" text-white bg-white shadow-lg p-4 w-64 bg-opacity-15">
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-200">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Teléfono</label>
          <input
            type="phone"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu teléfono"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Mensaje</label>
          <textarea
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu mensaje"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg bg-opacity-70 w-full">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
