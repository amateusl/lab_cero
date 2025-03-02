import Layout from "../components/layout/layout";
import Card from "../components/card/card-trabajo";
import { useState, useEffect } from "react";
import CreateModal from "../components/modal/trabajo/modal-create-trabajo";
import { getTrabajos } from "../api/trabajo";

export default function Trabajo() {
    const [trabajos, setTrabajos] = useState([]); // Estado para almacenar trabajos
    const [search, setSearch] = useState(""); // Estado para búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 8; // Número de trabajos por página

    // Cargar trabajos desde la API
    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await getTrabajos();
                setTrabajos(response || []);
            } catch (error) {
                console.error("Error fetching trabajos:", error);
                setTrabajos([]);
            }
        };

        fetchTrabajos();
    }, []);

    // Filtrar trabajos basándose en el cargo
    const filteredTrabajos = trabajos.filter((trabajo) =>
        trabajo.cargo.toLowerCase().includes(search.toLowerCase())
    );

    // Calcular las páginas totales
    const totalPages = Math.ceil(filteredTrabajos.length / itemsPerPage);

    // Dividir los trabajos para la página actual
    const displayedTrabajos = filteredTrabajos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-color-4 min-h-screen flex flex-col">
            <Layout>
                <div className="flex-grow">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <div className="md:w-1/4 p-4 font-lexend flex flex-col items-center mt-20 m-5 md:ml-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 p-2 bg-color-1 text-color-4 rounded-xl text-2xl mb-10"
                            >
                                Agregar trabajo
                            </button>
                            <img src="https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/trabajo.png?raw=true" alt="Trabajos" className="w-3/4" />
                            <h1 className="text-6xl font-bold text-color-1">
                                TRABAJO
                            </h1>
                            <input
                                type="text"
                                placeholder="Buscar por cargo"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} // Actualiza la búsqueda
                                className="p-2 rounded-2xl w-80 mt-4"
                            />
                        </div>

                        {/* Main content */}
                        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full min-h-screen p-20">
                            {displayedTrabajos.map((trabajo, index) => (
                                <Card
                                    key={index}
                                    idtrabajo={trabajo.id_trabajo}
                                    cargo={trabajo.cargo}
                                    empresa={trabajo.empresa}
                                    salario={trabajo.salario}
                                    idpersona={trabajo.id_persona}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Controles de Paginación */}
                    <div className="flex justify-center mt-4 mb-10">
                        <button
                            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-color-1 text-color-4 rounded-lg mr-2"
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2 text-color-1">
                            {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-color-1 text-color-4 rounded-lg ml-2"
                        >
                            Siguiente
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <CreateModal onClose={() => setIsModalOpen(false)} />
                    )}
                </div>
            </Layout>
        </div>
    );
}
