/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { getArticulo } from "../api/articulo.js";
import { getUsuario } from "../api/usuario.js";
import formatDate from "../utils/formatDate.js";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { GeneralContext } from "../contexts/GeneralContext.jsx";

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

      <ReactMarkdown
        className="mx-6 md:mx-auto max-w-3xl my-4"
        components={{
          h1(props) {
            const { node, ...rest } = props;
            return (
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  marginBottom: "1em"
                }}
                {...rest}
              />
            );
          },
          h2(props) {
            const { node, ...rest } = props;
            return (
              <h2
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  margin: "1em 0 0.5em 0"
                }}
                {...rest}
              />
            );
          },
          h3(props) {
            const { node, ...rest } = props;
            return (
              <h3
                style={{
                  fontSize: "1.17em",
                  fontWeight: "bold",
                  margin: "1em 0 0.5em 0"
                }}
                {...rest}
              />
            );
          },
          h4(props) {
            const { node, ...rest } = props;
            return (
              <h4
                style={{
                  fontSize: "1em",
                  fontWeight: "bold",
                  margin: "1em 0 0.5em 0"
                }}
                {...rest}
              />
            );
          },
          div(props) {
            const { node, ...rest } = props;
            return (
              <div
                style={{
                  fontSize: "1.2em"
                }}
                {...rest}
              />
            );
          },
          p(props) {
            const { node, ...rest } = props;
            return (
              <p
                style={{
                  margin: "1em 0"
                }}
                {...rest}
              />
            );
          },
          a(props) {
            const { node, ...rest } = props;
            return (
              <a
                style={{
                  color: "#3182ce",
                  textDecoration: "underline"
                }}
                {...rest}
              />
            );
          },
          img(props) {
            const { node, ...rest } = props;
            return (
              <img
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  margin: "1em auto"
                }}
                {...rest}
              />
            );
          },
          ul(props) {
            const { node, ...rest } = props;
            return (
              <ul
                style={{
                  fontSize: "1em",
                  margin: "1em 0"
                }}
                {...rest}
              />
            );
          },
          ol(props) {
            const { node, ...rest } = props;
            return (
              <ol
                style={{
                  fontSize: "1em",
                  margin: "1em 0"
                }}
                {...rest}
              />
            );
          },
          li(props) {
            const { node, ...rest } = props;
            return (
              <li
                style={{
                  margin: "0.5em 0"
                }}
                {...rest}
              />
            );
          },
          blockquote(props) {
            const { node, ...rest } = props;
            return (
              <blockquote
                style={{
                  borderLeft: "4px solid #3182ce",
                  padding: "0.5em 1em",
                  margin: "1em 0"
                }}
                {...rest}
              />
            );
          },
          code(props) {
            const { node, ...rest } = props;
            return (
              <code
                style={{
                  backgroundColor: "#f7fafc",
                  padding: "0.2em 0.4em",
                  borderRadius: "0.2em"
                }}
                {...rest}
              />
            );
          }
        }}
      >
        {article.contenido}
      </ReactMarkdown>
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
