import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <div className="h-screen bg-color-1 flex flex-col justify-between items-center">
            {/* Título centrado en la parte superior */}
            <div className="text-center mt-8">
                <h1 className="text-4xl md:text-5xl font-lexend text-color-4 font-bold">
                    LAB-0: CRUD
                </h1>
                <p className="text-lg md:text-2xl font-lexend text-color-4 mt-2">
                    Grupo - LEROI
                </p>
            </div>

            {/* Header (botones centrados en el medio de la pantalla) */}
            <nav className="bg-color-1 font-lexend w-full p-6">
                <ul className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-2xl text-color-4">
                    <li>
                        <Link
                            to="/"
                            className={`px-4 py-2 font-medium rounded ${
                                currentPath === "/" ? "rounded-3xl border border-color-4" : ""
                            }`}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/personas"
                            className={`px-4 py-2 font-medium rounded ${
                                currentPath === "/personas"
                                    ? "rounded-3xl border border-color-4"
                                    : ""
                            }`}
                        >
                            Personas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/municipios"
                            className={`px-4 py-2 font-medium rounded ${
                                currentPath === "/municipios"
                                    ? "rounded-3xl border border-color-4"
                                    : ""
                            }`}
                        >
                            Municipios
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/viviendas"
                            className={`px-4 py-2 font-medium rounded ${
                                currentPath === "/viviendas"
                                    ? "rounded-3xl border border-color-4"
                                    : ""
                            }`}
                        >
                            Viviendas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/trabajo"
                            className={`px-4 py-2 font-medium rounded ${
                                currentPath === "/trabajo"
                                    ? "rounded-3xl border border-color-4"
                                    : ""
                            }`}
                        >
                            Trabajo
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="w-full h-96">
                <img
                    src="https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/home/Cundimapa.jpg?raw=true"
                    alt="Imagen principal"
                    className="w-full h-96 object-cover"
                />
            </div>

            {/* Sección de integrantes en 2 columnas */}
            <div className="bg-color-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12 w-full px-8 md:px-20">
                {[
                    {
                        name: "Sebastián López Silva",
                        role: "Ing. de sistemas y computación",
                        image: "https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/members/mateo.png?raw=true"
                    },
                    {
                        name: "Maria Camila Amaya Rodríguez",
                        role: "Ing. de sistemas y computación",
                        image: "https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/members/camila.png?raw=true"
                    },
                    {
                        name: "Anderson Steven Mateus López",
                        role: "Ing. de sistemas y computación",
                        image: "https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/members/anderson.png?raw=true"
                    },
                    {
                        name: "Juan David Rodríguez Gómez",
                        role: "Ing. de sistemas y computación",
                        image: "https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/members/juan.png?raw=true"
                    }
                ].map((member, index) => (
                    <div
                        key={index}
                        className="bg-color-3 text-color-4 rounded-3xl flex flex-col items-center md:flex-row w-full p-4 md:p-6 shadow-lg"
                    >
                        {/* Imagen del integrante en círculo */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                            <img
                                src={member.image}
                                alt={`Miembro ${member.name}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Información del integrante */}
                        <div className="text-center md:text-left md:ml-6 mt-4 md:mt-0">
                            <p className="text-lg md:text-xl font-semibold">
                                {member.name}
                            </p>
                            <p className="text-sm">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
