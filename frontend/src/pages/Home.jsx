import { useEffect, useState } from "react";
import { getServicios } from "../api/servicio.js";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicios();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-10">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        rerum ipsum voluptatibus est nemo eveniet, nobis corporis tempore quia
        voluptas aliquid provident in repudiandae temporibus sit rem, debitis
        quaerat placeat?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        rerum ipsum voluptatibus est nemo eveniet, nobis corporis tempore quia
        voluptas aliquid provident in repudiandae temporibus sit rem, debitis
        quaerat placeat?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        rerum ipsum voluptatibus est nemo eveniet, nobis corporis tempore quia
        voluptas aliquid provident in repudiandae temporibus sit rem, debitis
        quaerat placeat?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        rerum ipsum voluptatibus est nemo eveniet, nobis corporis tempore quia
        voluptas aliquid provident in repudiandae temporibus sit rem, debitis
        quaerat placeat?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        rerum ipsum voluptatibus est nemo eveniet, nobis corporis tempore quia
        voluptas aliquid provident in repudiandae temporibus sit rem, debitis
        quaerat placeat?
      </p>
      <ul>
        {services
          ? services.map(service => <li key={service.id}>{service.nombre}</li>)
          : ""}
      </ul>
    </div>
  );
}

export default Home;
