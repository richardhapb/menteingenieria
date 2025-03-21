import { useState, useEffect } from "react";
import { getOpenAiText } from "../api/openai.js";

const NewsAI = () => {
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(true);

  // "Openai news"
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await getOpenAiText();
      setNews(response.text);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Update each minute
  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-opacity-90 shadow-lg rounded-md text-black bg-gray-400 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Recomendaciones de la IA</h2>
      {loading ? <p>Cargando recomendación...</p> : <p>{news}</p>}
    </div>
  );
};

export default NewsAI;
