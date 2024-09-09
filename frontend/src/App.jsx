import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.jsx";
import Main from "./layouts/Main.jsx";
import Home from "./pages/Home.jsx";
import ArticleEntry from "./pages/ArticleEntry.jsx";
import About from "./pages/About.jsx";
import GeneralContextProvider from "./contexts/GeneralContext.jsx";
import "@fontsource/news-cycle/400.css";
import "@fontsource/news-cycle/700.css";

function App() {
  return (
    <>
      <Router>
        <GeneralContextProvider>
          <Routes>
            <Route exact path="/" element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog/" element={<Blog />} />
              <Route path="/blog/:id" element={<ArticleEntry />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </GeneralContextProvider>
      </Router>
    </>
  );
}

export default App;
