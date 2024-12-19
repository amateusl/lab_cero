import Layout from "../components/layout/layout";
import Card from "../components/card/card-vivienda";
import { useState, useEffect } from 'react';
import CreateModal from "../components/modal/vivienda/modal-create-vivienda";
import { getViviendas } from "../api/vivienda";
import { getViviendaDetalle } from "../api/vivienda";

export default function Viviendas() {
    const [viviendas, setViviendas] = useState([]); // Estado para viviendas
    const [search, setSearch] = useState(''); // Estado para búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 8; // Número de viviendas por página

    // Cargar viviendas desde la API
    useEffect(() => {
        const fetchViviendas = async () => {
            try {
                const viviendasData = await getViviendas();

                // Intentar agregar detalles a cada vivienda
                const viviendasWithDetails = await Promise.all(
                    viviendasData.map(async (vivienda) => {
                        try {
                            const detalles = await getViviendaDetalle(vivienda.id_vivienda);
                            return { ...vivienda, detalles };
                        } catch (error) {
                            console.warn(
                                `No se encontraron detalles para vivienda ID ${vivienda.id_vivienda}`
                            );
                            return { ...vivienda, detalles: null }; // Asignar null si no hay detalles
                        }
                    })
                );

                setViviendas(viviendasWithDetails);
            } catch (error) {
                console.error("Error al obtener viviendas:", error);
            }
        };

        fetchViviendas();
    }, []);

    // Filtrar viviendas basándose en la dirección
    const filteredViviendas = viviendas.filter((vivienda) =>
        vivienda.direccion.toLowerCase().includes(search.toLowerCase())
    );

    // Calcular las páginas totales
    const totalPages = Math.ceil(filteredViviendas.length / itemsPerPage);

    // Dividir las viviendas para la página actual
    const displayedViviendas = filteredViviendas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-color-1 bg-opacity-70">
            <Layout>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 font-lexend flex flex-col items-center mt-20 m-5 md:ml-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 p-2 bg-color-4 text-color-1 rounded-xl text-2xl mb-10"
                        >
                            Agregar Vivienda
                        </button>
                        <img src="https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/casa.png?raw=true" alt="Viviendas" className="w-80" />
                        <h1 className="text-6xl font-bold text-color-4">VIVIENDAS</h1>
                        <input
                            type="text"
                            placeholder="Buscar por dirección de la vivienda"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // Actualiza la búsqueda
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>

                    {/* Lista de Viviendas */}
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full min-h-screen p-20">
                        {displayedViviendas.map((vivienda, index) => (
                            <Card
                                key={index}
                                id={vivienda.id_vivienda}
                                idpropietario={vivienda.detalles?.propietario?.id_persona || 'Sin propietario'}
                                municipio={vivienda.detalles?.municipio_nombre || 'Sin municipio'}
                                direccion={vivienda.direccion}
                                capacidad={vivienda.capacidad || 'N/A'}
                                niveles={vivienda.niveles || 'N/A'}
                            />
                        ))}
                    </div>
                </div>

                {/* Controles de Paginación */}
                <div className="flex justify-center mt-4 mb-10">
                    <button 
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-color-4 text-color-1 rounded-lg mr-2"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 text-color-4">
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-color-4 text-color-1 rounded-lg ml-2"
                    >
                        Siguiente
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && <CreateModal onClose={() => setIsModalOpen(false)} />}
            </Layout>
        </div>
    );
}
