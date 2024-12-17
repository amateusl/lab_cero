import Layout from "../components/layout/layout"
import Card from "../components/card/card-trabajo"
import { useState, useEffect } from 'react';
import CreateModal from "../components/modal/trabajo/modal-create-trabajo";
import { getTrabajos } from "../api/trabajo";

export default function Trabajo() {
    const [trabajos, setTrabajos] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await getTrabajos();
                setTrabajos(response || []);
            } catch (error) {
                console.error('Error fetching trabajos:', error);
                setTrabajos([]);
            }
        }

        fetchTrabajos();
    }, []);

    const filteredTrabajos = trabajos ? trabajos.filter(trabajo =>
        trabajo.cargo.toLowerCase().includes(search.toLowerCase())
    ) : [];

    return (
        <div className="bg-purple-900">
            <Layout>
                <div className="flex flex-col md:flex-row h-screen">
                    <div className="md:w-1/4 p-4 font-lato flex flex-col items-center mt-20 m-5 md:ml-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 p-2 bg-color-1 text-color-4 rounded-xl text-2xl mb-10"
                        >
                            Agregar trabajo
                        </button>
                        <img src="https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/extra/trabajo.png" alt="Trabajos" className="w-3/4" />
                        <h1 className="text-6xl font-bold text-color-1">TRABAJO</h1>
                        <input
                            type="text"
                            placeholder="Buscar por cargo"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full min-h-screen p-20">
                        {filteredTrabajos.map((trabajo, index) => (
                            <Card
                                key={index}
                                idtrabajo={trabajo.id_trabajo}
                                cargo={trabajo.cargo}
                                empresa={trabajo.empresa}
                                salario={trabajo.salario}
                                idpersona={trabajo.id_persona}
                            />
                        ))}
                        {isModalOpen && <CreateModal onClose={() => setIsModalOpen(false)} />}

                    </div>

                </div>
            </Layout >
        </div >
    )
}