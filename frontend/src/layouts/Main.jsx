import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="container bg-color mx-auto ">
      <Outlet />
    </main>
  );
};

export default Main;
