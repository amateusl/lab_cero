import Layout from "../components/layout/layout"
import Card from "../components/card/card-vivienda"
import { useState, useEffect } from 'react';
import CreateModal from "../components/modal/vivienda/modal-create-vivienda";
import { getViviendas } from "../api/vivienda";
import { getUbicaciones } from "../api/ubicada";
import { getMunicipioInfo } from "../api/municipio";
import { getPropietarioById } from "../api/propietario";
import { getPersonaById } from "../api/persona";

export default function Viviendas() {
    const [viviendas, setViviendas] = useState([]);
    useEffect(() => {
        const fetchViviendas = async () => {
            const viviendasData = await getViviendas();
            // console.log(viviendasData);
            const viviendasWithMunicipioAndPropietario = await Promise.all(viviendasData.map(async (vivienda) => {
                const ubicadaData = await getUbicaciones(vivienda.id_vivienda);
                console.log("Paso1",ubicadaData);
                const municipioInfo = await getMunicipioInfo(ubicadaData[0].id_municipio);
                console.log("PAso 2",municipioInfo);
                const propietarioData = await getPropietarioById(vivienda.id_vivienda, {
                    "es_id_persona": 0
                });
                const personaInfo = await getPersonaById(propietarioData[0].id_persona);
                return { ...vivienda, municipio: municipioInfo, propietario: personaInfo };
            }));
            setViviendas(viviendasWithMunicipioAndPropietario);
        };

        fetchViviendas();
    }, []);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredViviendas = viviendas.filter(vivienda =>
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
                            onChange={e => setSearch(e.target.value)}
                            className="p-2 rounded-2xl w-80 mt-4"
                        />
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-full min-h-screen p-20">
                        {filteredViviendas.map((vivienda, index) => (
                            <Card
                                key={index}
                                id={vivienda.id_vivienda}
                                idpropietario={vivienda.propietario.id_persona}
                                municipio={vivienda.municipio.nombre}
                                direccion={vivienda.direccion}
                                capacidad={vivienda.capacidad}
                                niveles={vivienda.niveles}
                            />
                        ))}
                    </div>
                    {isModalOpen && <CreateModal onClose={() => setIsModalOpen(false)} />}
                </div>
            </Layout>
        </div>
    )
}