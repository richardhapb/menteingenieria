import { useState, useEffect } from "react";
import { getUsuarios } from "../api/usuario.js";
import formatDate from "../utils/formatDate.js";

const Article = article => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getUsuarios();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const author = users.find(user => user.id === article.autor);
  return (
    <div className="tertiary-bg-color hover:bg-zinc-200 hover:cursor-pointer rounded-xl p-3 size-full flex flex-col justify-between my-4 md:my-0">
      <div className="px-2">
        <img src={article.imagen} className="mx-auto p-2" />
      </div>
      <h2 className="text-3xl font-bold p-2">{article.titulo}</h2>
      <div className="text-left">
        <div className="w-full mx-auto">
          <span className="font-semibold">Autor:</span>
          {" " +
            /* {First name and last name} */
            (author
              ? author.first_name + " " + author.last_name
              : "Desconocido")}
        </div>
        <div className="py-2">
          <span className="font-semibold">Fecha:</span>{" "}
          {" " + formatDate(article.fecha)}
        </div>
      </div>
      <div>
        {
          article.contenido.slice(0, 200) +
            (article.contenido.length > 200 ? "..." : "") /* Truncate content */
        }
      </div>
    </div>
  );
};

export default Article;
