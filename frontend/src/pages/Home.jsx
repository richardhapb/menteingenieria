import { useEffect, useState } from "react";
import { getServices } from "../api/service.js";
import ServicesItem from "../components/ServicesItem.jsx";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-10">
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl font-bold text-center my-8">
          El 70% de las empresas que adoptan IA y automatización reducen sus
          costos operativos en un 30%
          <p className="text-sm font-normal py-4">
            {" "}
            (Fuente: McKinsey & Company)
          </p>
        </h1>
      </div>
      <ul className="my-10">
        {services
          ? services.map(service => (
              <li key={service.id}>
                <ServicesItem {...service} />
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default Home;
