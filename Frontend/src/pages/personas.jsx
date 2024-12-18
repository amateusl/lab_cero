import Layout from "../components/layout/layout";
import Card from "../components/card/card-persona";
import { useState, useEffect } from "react";
import CreateModal from "../components/modal/persona/modal-create-persona";
import { getPersonas } from "../api/persona";

export default function Personas() {
    const [personas, setPersonas] = useState([]); // Estado para almacenar personas
    const [search, setSearch] = useState(""); // Estado para búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

    // Cargar personas desde la API
    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await getPersonas();
                if (Array.isArray(response.data)) {
                    setPersonas(response.data);
                } else {
                    console.error("Error: Datos no válidos", response.data);
                }
            } catch (error) {
                console.error("Error fetching personas:", error);
            }
        };

        fetchPersonas();
    }, []);

    // Filtrar personas basándose en el nombre
    const filteredPersonas = personas.filter((persona) =>
        persona.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-color-2">
            <Layout>
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="md:w-1/4 p-4 font-lexend flex flex-col items-center mt-20 m-5 md:ml-10">
                        <button
                            onClick={() => setIsModalOpen(true)} // Abre el modal
                            className="mt-4 p-2 bg-color-1 text-color-4 rounded-xl text-2xl mb-10"
                        >
                            Agregar Persona
                        </button>
                        <img src="" alt="Personas" className="w-40" />
                        <h1 className="text-6xl font-bold text-color-1">PERSONAS</h1>
                        <input
                            type="text"
                            placeholder="Buscar por nombre de la persona"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // Actualiza la búsqueda
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>

                    {/* Lista de Personas */}
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-full min-h-screen p-20 content-start">
                        {filteredPersonas.map((persona) => (
                            <Card
                                key={persona.id_persona} // Usa un ID único como clave
                                id={persona.id_persona}
                                nombre={persona.nombre}
                                documento={persona.documento}
                                celular={persona.celular}
                                edad={persona.edad}
                                sexo={persona.sexo}
                            />
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <CreateModal onClose={() => setIsModalOpen(false)} />
                )}
            </Layout>
        </div>
    );
}
