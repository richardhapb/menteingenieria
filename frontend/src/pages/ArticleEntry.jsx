import { useEffect, useState, useContext } from "react";
import {  getArticle } from "../api/article.js";
import {  getUser } from "../api/user.js";
import formatDate from "../utils/formatDate.js";
import { Link } from "react-router-dom";
import { GeneralContext } from "../contexts/GeneralContext.jsx";
import Markdown from "markdown-to-jsx";
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';

/// This is the full page of the blog article, this render the markdown and LaTeX
/// is similar to article preview but add more logic for avoid conflicts
/// between markdown and LaTeX rendering.

/// TODO: Generate functions for repeated code between preview and full article

const ArticleEntry = () => {
    const id = window.location.pathname.split("/").pop();
    const [article, setArticle] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [processedContent, setProcessedContent] = useState("");

    const { darkMode } = useContext(GeneralContext);

    useEffect(() => {
        const getArticleFromApi = async () => {
            try {
                const data = await getArticle(id);
                setArticle(data);
            } catch (error) {
                console.log(error);
            }
        };
        getArticleFromApi();
    }, [id]);

    useEffect(() => {
        if (!article.author) return;
        setLoading(false);
        const getUserFromApi = async () => {
            try {
                const data = await getUser(article.author);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserFromApi();
    }, [article]);

    // Process content to protect LaTeX from Markdown parsing
    useEffect(() => {
        if (article.content) {
            /**
             * Protect LaTeX expressions in the markdown content.
             *
             * @param {string} content The markdown content.
             * @returns {object} An object containing the processed text and a map of tokens to the original LaTeX.
             */
            const protectLatex = (content) => {
                const latexMap = new Map()
                let tokenCounter = 1000
                let processedText = content
                const patterns = [
                    { regex: /\$\$([\s\S]+?)\$\$/g, delimiter: "$$" },
                    { regex: /\$(?!\$)([\s\S]+?)\$(?!\$)/g, delimiter: "$" },
                ]
                patterns.forEach(({ regex, delimiter }) => {
                    for (const match of content.matchAll(regex)) {
                        tokenCounter++
                        const token = `${tokenCounter}latextoken${tokenCounter}`
                        const originalLatex = `${delimiter}${match[1]}${delimiter}`
                        const centeredLatex = delimiter === "$$" ? `<div class="text-center">${originalLatex}</div>` : originalLatex // Center display math
                        latexMap.set(token, centeredLatex)
                        processedText = processedText.replace(match[0], token)
                    }
                })
                return { processedText, latexMap }
            }

            const { processedText, latexMap } = protectLatex(article.content);
            setProcessedContent({ text: processedText, latexMap });
        }
    }, [article.content]);

    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (loading || !processedContent) return;

        // Function to restore LaTeX tokens after Markdown processing
        const restoreLatexTokens = () => {
            if (!processedContent.latexMap) return;

            const element = document.getElementById("article-content");
            if (!element) return;

            // Find all LaTeX tokens in the rendered HTML and replace them with the original LaTeX
            processedContent.latexMap.forEach((latex, token) => {
                // All query selectors
                let tokenElements = Array.from(document.querySelectorAll('p')).filter(el => el.innerHTML.includes(token));
                if (!tokenElements.length) {
                    tokenElements = Array.from(document.querySelectorAll('li')).filter(el => el.innerHTML.includes(token));
                }

                tokenElements.forEach(el => {
                    el.innerHTML = el.innerHTML.replace(token, latex);
                });
            });

            // Now render the LaTeX
            renderMathInElement(element, {
                delimiters: [
                    { left: "$$", right: "$$", display: true, },
                    { left: "$", right: "$", display: false },
                ]
            });
        };

        // We need to wait for the DOM to update after Markdown rendering
        setTimeout(restoreLatexTokens, 0);
    }, [loading, processedContent]);

    return (
        <div className="min-h-screen">
            <div className="relative">
                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full z-0 object-cover max-h-96"
                    />
                ) : (
                    <div className="w-full h-96 bg-black" />
                )}
                <div className="absolute inset-0 flex items-center text-4xl font-bold text-white z-10 justify-center">
                    <h1 className="text-5xl font-bold bg-gray-900 bg-opacity-90 h-40 w-full flex items-center px-6">
                        {article.title}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="mx-auto max-w-3xl my-4">
                    <span className="font-italic font-semibold">Autor: </span>
                    {user.first_name
                        ? user.first_name + " " + user.last_name
                        : ""}
                </div>
                <div className="mx-auto max-w-3xl my-4">
                    <span className="font-italic font-semibold">Fecha: </span>
                    {formatDate(article.date)}
                </div>
            </div>

            <div id="article-content" className="mx-6 md:mx-auto max-w-3xl my-4">
                {processedContent && (
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
                        {processedContent.text}
                    </Markdown>
                )}
            </div>

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
