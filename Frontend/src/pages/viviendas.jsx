import Layout from "../components/layout/layout";
import Card from "../components/card/card-vivienda";
import { useState, useEffect } from 'react';
import CreateModal from "../components/modal/vivienda/modal-create-vivienda";
import { getViviendas } from "../api/vivienda";
import { getViviendaDetalle } from "../api/vivienda";

export default function Viviendas() {
    const [viviendas, setViviendas] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const filteredViviendas = viviendas.filter((vivienda) =>
        vivienda.direccion.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-color-1">
            <Layout>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 font-lexend flex flex-col items-center mt-20 m-5 md:ml-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 p-2 bg-color-4 text-color-1 rounded-xl text-2xl mb-10"
                        >
                            Agregar Vivienda
                        </button>
                        <img src="" alt="Viviendas" className="w-80" />
                        <h1 className="text-6xl font-bold text-color-4">VIVIENDAS</h1>
                        <input
                            type="text"
                            placeholder="Buscar por dirección de la vivienda"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full min-h-screen p-20">
                        {filteredViviendas.map((vivienda, index) => (
                            <Card
                                key={index}
                                id={vivienda.id_vivienda}
                                idpropietario={
                                    vivienda.detalles?.propietario?.id_persona || 'Sin propietario'
                                }
                                municipio={vivienda.detalles?.municipio_nombre || 'Sin municipio'}
                                direccion={vivienda.direccion}
                                capacidad={vivienda.capacidad || 'N/A'}
                                niveles={vivienda.niveles || 'N/A'}
                            />
                        ))}
                    </div>
                    {isModalOpen && <CreateModal onClose={() => setIsModalOpen(false)} />}
                </div>
            </Layout>
        </div>
    );
}
