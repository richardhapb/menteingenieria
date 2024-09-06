import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Main = () => {
  return (
    <main className=" text-white bg-primary-color mx-auto w-full min-h-screen bg-no-repeat bg-center bg-cover">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;
