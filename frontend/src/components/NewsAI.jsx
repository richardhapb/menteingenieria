import { useState, useEffect } from "react";
import { getOpenAiText } from "../api/openai.js";

const NewsAI = () => {
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener una noticia desde OpenAI
  const fetchNews = async () => {
    setLoading(true);
    try {
      const PROMPT =
        "Estás mostrando texto en un página web, dale recomendaciones al cliente referente a como la implementación de la IA, la investigación de operaciones o la inteligencia de negocios lo puede ayudar a mejorar su rentabilidad y sostenibilidad, basate en datos y propón soluciones prácticas, nombrá las metodologías, por ejemplo: ML o Lean, no es necesario que nombre estas dos. No uses más de 40 palabras. Y no repitas la anterior.";
      const response = await getOpenAiText(PROMPT);
      setNews(response.text);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Actualiza la noticia cada 1 minuto
  useEffect(() => {
    fetchNews(); // Llama a la función cuando el componente se monta
    const interval = setInterval(() => {
      fetchNews(); // Actualiza la noticia cada minuto
    }, 30000); // 30,000ms = 1/2 minuto

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="p-6 bg-opacity-90 shadow-lg rounded-md text-black bg-gray-400 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Recomendaciones de la IA</h2>
      {loading ? <p>Cargando recomendación...</p> : <p>{news}</p>}
    </div>
  );
};

export default NewsAI;
