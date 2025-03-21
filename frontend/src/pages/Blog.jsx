import { useEffect, useState } from "react";
import { getArticles } from "../api/article.js";
import Article from "../components/Article.jsx";
import { Link } from "react-router-dom";

/// Main blog view

const Blog = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getArticlesFromApi = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (error) {
                console.log(error);
            }
        };
        getArticlesFromApi();
    }, []);

    return (
        <div>
            <h1 className="text-4xl text-center my-8 font-bold">Últimos artículos</h1>
            <ul className="mx-auto text-center md:grid md:grid-cols-3 md:gap-5 p-4 max-w-6xl">
                {articles.map(article => (
                    <li key={article.id}>
                        <Link to={`/blog/${article.id}`}>
                            <Article {...article} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
