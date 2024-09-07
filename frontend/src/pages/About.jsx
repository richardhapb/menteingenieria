const About = () => {
  return (
    <div className="relative text-whit shadow-lg mx-auto bg-opacity-15 flex flex-col min-h-screen overflow-hidden image-linear-s">
      <div className="absolute w-full">
        <img
          src="../src/assets/about.webp"
          alt="Acerca de nosotros"
          className=" w-full image-linear opacity-20 "
        />
      </div>
      <div className="w-full p-8 py-20 my-20">
        <h1 className="text-3xl font-bold my-10 py-6 leading-8 text-center">
          Acerca de Mente Ingeniería
        </h1>
        <p className="text-white text-lg w-full p-3 my-10">
          En Mente Ingeniería somos un equipo de ingenieros apasionados por la
          tecnología y la innovación. Nuestro enfoque está en mejorar los
          procesos empresariales a través de la implementación de herramientas
          avanzadas de inteligencia artificial y ciencias de la información.
          Creemos que la optimización y la eficiencia son la clave para el éxito
          de cualquier organización, y nuestro objetivo es ayudar a las empresas
          a alcanzar su máximo potencial. Ofrecemos soluciones personalizadas en
          optimización de procesos, asesorías en gestión y administración, e
          investigación de operaciones. Aplicamos técnicas de vanguardia para
          analizar datos y modelar escenarios complejos, brindando a nuestros
          clientes las herramientas necesarias para tomar decisiones informadas
          y estratégicas. Con un enfoque en la innovación continua, nuestro
          compromiso es diseñar soluciones que no solo resuelvan problemas
          actuales, sino que también preparen a las empresas para los retos del
          futuro. Mente Ingeniería es el aliado ideal para quienes buscan
          transformar sus procesos, reducir costos y aumentar la productividad.
        </p>
      </div>
    </div>
  );
};

export default About;
