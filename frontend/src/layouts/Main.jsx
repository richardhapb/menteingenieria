import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

const Main = () => {
  return (
    <main className="bg-color mx-auto w-full bg-primary-color min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
};

export default Main;
