import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.jsx";
import Main from "./layouts/Main.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/blog/" element={<Blog />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
