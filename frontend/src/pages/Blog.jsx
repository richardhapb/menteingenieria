import { useEffect, useState } from "react";
import { getArticulos } from "../api/articulo.js";
import Article from "../components/Article.jsx";
const Blog = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await getArticulos();
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticles();
  }, []);

  return (
    <div>
      <ul className="mx-auto text-center md:grid md:grid-cols-3 md:gap-3 p-4">
        {articles.map(article => (
          <li key={article.id}>
            <Article {...article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
