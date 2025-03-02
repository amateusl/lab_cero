import { useState } from 'react';
import { updateMunicipio } from '../../../api/municipio';
import { updateGobierna } from '../../../api/gobierna';
import { getPersonaById } from '../../../api/persona';
import { getGobiernaByIdPersona } from '../../../api/gobierna';
import Swal from 'sweetalert2';

function Modal({ onClose, id, idalcaldeext, nombrealcaldeext, nombreext, altitudext, areaext }) {
    const [idalcalde, setIdAlcalde] = useState('');
    const [nombre, setNombre] = useState('');
    const [area, setArea] = useState('');
    const [altitud, setAltitud] = useState('');

    const handleSubmit = async (event) => {
        console.log(id);
        event.preventDefault();
        if (!idalcalde && !area && !altitud && !nombre) {
            Swal.fire('Error', 'Por favor rellene al menos un campo', 'error');
            return;
        }
        if (altitud && (altitud >= 9000 || altitud <= -400)) {
            Swal.fire('Error', 'La altitud debe ser menor a 9000 y mayor a -400', 'error');
            return;
        }
        if (area && area >= 70000) {
            Swal.fire('Error', 'El área debe ser menor a 70000', 'error');
            return;
        }
        try {
            const alcaldeInfo = await getPersonaById(idalcalde);
            if (!alcaldeInfo) {
                Swal.fire('Error', 'El alcalde no existe', 'error');
                return;
            }

            const existingGobierna = await getGobiernaByIdPersona(idalcalde);
            if (existingGobierna && existingGobierna[0] && existingGobierna[0].length > 0) {
                Swal.fire('Error', 'El alcalde ya está asignado a otro municipio', 'error');
                return;
            }

            await updateMunicipio(id, {
                "nombre": nombre !== '' ? nombre : nombreext,
                "area": area !== '' ? area : areaext,
                "altitud": altitud !== '' ? altitud : altitudext
            });
            await updateGobierna({
                "id_personaNuevo": idalcalde !== '' ? idalcalde : idalcaldeext,
                "id_municipioNuevo": id,
                "id_persona": idalcaldeext,
                "id_municipio": id
            });
            Swal.fire('Éxito', 'Municipio actualizado correctamente', 'success')
                .then(() => {
                    onClose();
                    window.location.reload();
                });

        } catch (error) {
            Swal.fire('Error', 'Error creando municipio', 'error');
            console.error('Error creating municipio:', error);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Editar Municipio</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <p className='mt-5'>Alcalde</p>
                                <p> Nombre: {nombrealcaldeext} Id - {idalcaldeext}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="idalcalde" className="mb-2">Editar alcalde</label>
                                <input id="idalcalde" type="number" value={idalcalde} onChange={e => setIdAlcalde(e.target.value)} placeholder="Id del nuevo alcalde" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="mb-2">Cambiar nombre del municipio</label>
                                <input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del municipio" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="area" className="mb-2">Editar area</label>
                                <input id="area" type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="Area en kilometros cuadrados" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="altitud" className="mb-2">Editar altitud</label>
                                <input id="altitud" type="number" value={altitud} onChange={e => setAltitud(e.target.value)} placeholder="Altitud en metros" className="p-2 border rounded" />
                            </div>
                            <button type="submit" className='mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-color-2 text-base font-medium text-color-4 hover:bg-color-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>Guardar</button>
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-color-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                                Cerrar
                            </button>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;