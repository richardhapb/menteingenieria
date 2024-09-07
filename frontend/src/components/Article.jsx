import { useState, useEffect, useContext } from "react";
import { getUsuario } from "../api/usuario.js";
import formatDate from "../utils/formatDate.js";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import ReactMarkdown from "react-markdown";

const Article = article => {
  const [user, setUser] = useState([]);

  const { darkMode } = useContext(GeneralContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getUsuario(article.autor);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div
      className={
        "hover:bg-zinc-200 hover:cursor-pointer rounded-xl p-3 size-full flex flex-col justify-between my-4 md:my-0 hover:opacity-70 " +
        (darkMode ? "bg-tertiary-color text-black" : "bg-gray-300 shadow-lg")
      }
    >
      <div className="px-2">
        <img src={article.imagen} className="mx-auto p-2" />
      </div>
      <h2 className="text-3xl font-bold p-2">{article.titulo}</h2>
      <div className="text-left">
        <div className="w-full mx-auto">
          <span className="font-semibold">Autor:</span>
          {" " +
            /* {First name and last name} */
            (user ? user.first_name + " " + user.last_name : "Desconocido")}
        </div>
        <div className="py-2">
          <span className="font-semibold">Fecha:</span>{" "}
          {" " + formatDate(article.fecha)}
        </div>
      </div>
      <ReactMarkdown className="text-left">
        {
          article.contenido.slice(0, 200) +
            (article.contenido.length > 200 ? "..." : "") /* Truncate content */
        }
      </ReactMarkdown>
    </div>
  );
};

export default Article;
