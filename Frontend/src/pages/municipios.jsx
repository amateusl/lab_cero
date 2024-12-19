import Layout from "../components/layout/layout";
import Card from "../components/card/card-municipio";
import { useState, useEffect } from 'react';
import CreateModal from "../components/modal/municipio/modal-create-municipio";
import { getMunicipios } from "../api/municipio";
import { getGobiernaByIdMunicipio } from "../api/gobierna";

export default function Municipios() {
    const [municipios, setMunicipios] = useState([]); // Estado para municipios
    const [search, setSearch] = useState(''); // Estado para búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 8; // Número de municipios por página

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const municipiosData = await getMunicipios();
                
                const municipiosWithAlcalde = await Promise.all(
                    municipiosData.map(async (municipio) => {
                        const gobiernaData = await getGobiernaByIdMunicipio(municipio.id_municipio);
                        
                        // Extrae el nombre del alcalde desde gobiernaData
                        const nombreAlcalde = gobiernaData?.municipio?.gobernante?.nombre || 'No asignado';

                        return { 
                            ...municipio, 
                            alcalde: { nombre: nombreAlcalde } // Solo incluye el nombre del alcalde
                        };
                    })
                );

                setMunicipios(municipiosWithAlcalde);
            } catch (error) {
                console.error("Error fetching municipios:", error);
            }
        };

        fetchMunicipios();
    }, []);

    // Filtrar municipios basándose en el nombre
    const filteredMunicipios = municipios.filter((municipio) =>
        municipio.nombre.toLowerCase().includes(search.toLowerCase())
    );

    // Calcular las páginas totales
    const totalPages = Math.ceil(filteredMunicipios.length / itemsPerPage);

    // Dividir los municipios para la página actual
    const displayedMunicipios = filteredMunicipios.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-color-4">
            <Layout>
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="md:w-1/4 p-4 font-lexend flex flex-col items-center mt-20 m-5 md:ml-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 p-2 bg-color-1 text-color-4 rounded-xl text-2xl mb-10"
                        >
                            Agregar Municipio
                        </button>
                        <img src="https://github.com/amateusl/lab_cero/blob/FrontEnd/Frontend/src/assets/municipio.png?raw=true" alt="Municipios" className="w-full" />
                        <h1 className="text-6xl font-bold text-color-1">MUNICIPIOS</h1>
                        <input
                            type="text"
                            placeholder="Buscar por nombre del municipio"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>

                    {/* Lista de Municipios */}
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-full min-h-screen p-20 content-start">
                        {displayedMunicipios.map((municipio, index) => (
                            <Card
                                key={index}
                                id={municipio.id_municipio}
                                nombrealcalde={municipio.alcalde.nombre} // Mostrar el nombre del alcalde
                                nombre={municipio.nombre}
                                area={municipio.area}
                                altitud={municipio.altitud}
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
                {isModalOpen && <CreateModal onClose={() => setIsModalOpen(false)} />}
            </Layout>
        </div>
    );
}
