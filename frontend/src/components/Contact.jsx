import { useState } from "react";
import { newSolicitud } from "../api/solicitud.js";

const Contact = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [timer, setTimer] = useState(0); // Estado para el temporizador
  let timerInterval;

  // Función para manejar la solicitud del formulario
  const handleContact = async e => {
    e.preventDefault();
    setLoading(true); // Inicia el estado de carga
    setTimer(0); // Reinicia el temporizador

    // Inicia el temporizador
    timerInterval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000); // Incrementa cada segundo

    try {
      const response = await newSolicitud({
        nombre: e.target[0].value,
        email: e.target[1].value,
        telefono: e.target[2].value,
        texto: e.target[3].value
      });
      console.log(response);
      e.target.reset(); // Reinicia el formulario
      alert("Mensaje enviado");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
      alert("Error al enviar mensaje");
    } finally {
      setLoading(false); // Termina el estado de carga
      clearInterval(timerInterval); // Detiene el temporizador
    }
  };

  return (
    <div className="text-white bg-white shadow-lg p-4 w-full bg-opacity-15">
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
      <form onSubmit={handleContact}>
        <div className="mb-4">
          <label className="block text-gray-200">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu nombre"
            disabled={loading} // Desactiva el campo mientras se está enviando
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu email"
            disabled={loading} // Desactiva el campo mientras se está enviando
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Teléfono</label>
          <input
            type="phone"
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu teléfono"
            disabled={loading} // Desactiva el campo mientras se está enviando
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200">Mensaje</label>
          <textarea
            className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
            placeholder="Tu mensaje"
            disabled={loading} // Desactiva el campo mientras se está enviando
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg bg-opacity-70 w-full"
          disabled={loading} // Desactiva el botón mientras se está enviando
        >
          {loading ? `Enviando... (${timer}s)` : "Enviar"}
        </button>
      </form>

      {/* Muestra un mensaje o indicador de carga */}
      {loading && (
        <div className="mt-4 text-center">
          <p>Enviando formulario, por favor espera... {timer}s</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
