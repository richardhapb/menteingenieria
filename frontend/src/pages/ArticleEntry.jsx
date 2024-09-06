import { useEffect, useState } from "react";
import { getArticulo } from "../api/articulo.js";
import { getUsuario } from "../api/usuario.js";
import formatDate from "../utils/formatDate.js";

const ArticleEntry = () => {
  const id = window.location.pathname.split("/").pop();

  const [article, setArticle] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(id);
    const getArticle = async () => {
      try {
        const data = await getArticulo(id);
        setArticle(data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, [id]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUsuario(article.autor);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [article]);

  return (
    <div className="bg-color min-h-screen">
      <div className="relative">
        {article.imagen ? (
          <img
            src={article.imagen}
            alt={article.titulo}
            className="w-full z-0 object-cover max-h-96"
          />
        ) : (
          <div className="w-full h-96 bg-black" />
        )}
        <div className="absolute inset-0 flex items-center text-4xl font-bold text-white z-10 justify-center">
          <h1 className="text-5xl font-bold bg-gray-900 bg-opacity-90 h-40 w-full flex items-center px-6">
            {article.titulo}
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="mx-auto max-w-3xl my-4">
          <span className="font-italic font-semibold">Autor: </span>
          {user.first_name + " " + user.last_name}
        </div>
        <div className="mx-auto max-w-3xl my-4">
          <span className="font-italic font-semibold">Fecha: </span>
          {formatDate(article.fecha)}
        </div>
      </div>
      <div className="mx-auto max-w-3xl my-4">{article.contenido}</div>
    </div>
  );
};

export default ArticleEntry;
