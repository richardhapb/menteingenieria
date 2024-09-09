/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { getArticulo } from "../api/articulo.js";
import { getUsuario } from "../api/usuario.js";
import formatDate from "../utils/formatDate.js";
import { Link } from "react-router-dom";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import Markdown from "markdown-to-jsx";

const ArticleEntry = () => {
  const id = window.location.pathname.split("/").pop();

  const [article, setArticle] = useState({});
  const [user, setUser] = useState({});

  const { darkMode } = useContext(GeneralContext);

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

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
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

      <Markdown
        className="mx-6 md:mx-auto max-w-3xl my-4"
        options={{
          forceBlock: true,
          overrides: {
            img: {
              props: { className: "w-full" }
            },
            h1: { props: { className: "text-4xl font-bold pt-5" } },
            h2: { props: { className: "text-3xl font-bold pt-5" } },
            h3: { props: { className: "text-2xl font-bold pt-5" } },
            h4: { props: { className: "text-xl font-bold pt-5" } },
            h5: { props: { className: "text-lg font-bold pt-5" } },
            p: { props: { className: "text-lg py-4" } },
            a: {
              props: {
                className:
                  "text-blue-500 hover:text-blue-700 underline cursor-pointer"
              }
            },
            ul: { props: { className: "list-disc list-inside pl-4" } },
            ol: {
              props: { className: "list-decimal pl-8" }
            },
            li: { props: { className: "text-lg" } },
            blockquote: {
              props: {
                className: "border-l-4 border-gray-500 bg-gray-100 p-4 italic"
              }
            }
          }
        }}
      >
        {article.contenido}
      </Markdown>
      <Link to="/blog" className="mx-auto my-12 text-center max-w-1/3">
        <p
          className={
            "text-2xl font-bold mt-10 hover:text-slate-500 " +
            (darkMode ? "text-slate-300" : "text-slate-800")
          }
        >
          {" "}
          Regresar a la lista de artículos
        </p>
      </Link>
    </div>
  );
};

export default ArticleEntry;
