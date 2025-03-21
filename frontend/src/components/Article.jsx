import { useState, useEffect, useContext } from "react";
import React from "react";
import { getUser } from "../api/user.js";
import formatDate from "../utils/formatDate.js";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import Markdown from "markdown-to-jsx";
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';

/// This handles how an article is displayed in the blog view, 
/// render the markdown to HTML and transform LaTeX formulas to HTML with 
/// custom fonts.

const Article = article => {
    const [user, setUser] = useState([]);
    const { darkMode } = useContext(GeneralContext);
    const contentRef = React.useRef(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await getUser(article.author);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Add KaTeX rendering after markdown is processed
    useEffect(() => {
        if (contentRef.current) {
            renderMathInElement(contentRef.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }
    }, [article.content]);

    return (
        <div
            className={
                "hover:bg-zinc-200 hover:cursor-pointer rounded-xl p-3 size-full flex flex-col justify-between my-4 md:my-0 hover:opacity-70 " +
                (darkMode ? "bg-tertiary-color text-black" : "bg-gray-300 shadow-lg")
            }
        >
            <div className="px-2">
                <img
                    src={article.image}
                    alt={article.title}
                    className="mx-auto p-2"
                />
            </div>
            <h2 className="text-3xl font-bold p-2">{article.title}</h2>
            <div className="text-left">
                <div className="w-full mx-auto">
                    <span className="font-semibold">Autor:</span>
                    {" " +
                        /* {First name and last name} */
                        (user ? user.first_name + " " + user.last_name : "")}
                </div>
                <div className="py-2">
                    <span className="font-semibold">Fecha:</span>{" "}
                    {" " + formatDate(article.date)}
                </div>
            </div>
            <div ref={contentRef}>
                <Markdown
                    className="text-left"
                    options={{
                        forceBlock: true,
                        overrides: {
                            // Add custom handling for math blocks if needed
                            math: {
                                component: ({ children, ...props }) => (
                                    <div className="math-display" {...props}>{children}</div>
                                )
                            },
                            inlineMath: {
                                component: ({ children, ...props }) => (
                                    <span className="math-inline" {...props}>{children}</span>
                                )
                            }
                        }
                    }}
                >
                    {article.content.slice(0, 200) +
                        (article.content.length > 200 ? "..." : "")}
                </Markdown>
            </div>
        </div>
    );
};

export default Article;
