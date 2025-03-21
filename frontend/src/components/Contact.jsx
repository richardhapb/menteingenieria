import { useState } from "react";
import { newRequest } from "../api/request.js";

/// Form where the user can send requests
/// This handle the rendering and animation

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    let timerInterval;

    //Handle the form request
    const handleContact = async e => {
        e.preventDefault();
        setLoading(true);
        setTimer(0);

        timerInterval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        try {
            const response = await newRequest({
                name: e.target[0].value,
                email: e.target[1].value,
                phone: e.target[2].value,
                text: e.target[3].value
            });
            console.log(response);
            e.target.reset();
            alert("Mensaje enviado");
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
            alert("Error al enviar mensaje");
        } finally {
            setLoading(false);
            clearInterval(timerInterval);
        }
    };

    return (
        <div className="text-white bg-white shadow-lg p-4 w-full bg-opacity-15 image-linear-xs">
            <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
            <form onSubmit={handleContact}>
                <div className="mb-4">
                    <label className="block text-gray-200">Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
                        placeholder="Tu nombre"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
                        placeholder="Tu email"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200">Teléfono</label>
                    <input
                        type="phone"
                        className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
                        placeholder="Tu teléfono"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200">Mensaje</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 bg-white rounded-lg bg-opacity-30"
                        placeholder="Tu mensaje"
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg bg-opacity-70 w-full"
                    disabled={loading}
                >
                    {loading ? `Enviando... (${timer}s)` : "Enviar"}
                </button>
            </form>

            {/* Loading message */}
            {loading && (
                <div className="mt-4 text-center">
                    <p>Enviando formulario, por favor espera... {timer}s</p>
                </div>
            )}
        </div>
    );
};

export default Contact;
