import { useState } from 'react';
import { updateVivienda } from '../../../api/vivienda';
import { createPropietario } from '../../../api/propietario';
import Swal from 'sweetalert2';
function Modal({ onClose, id, direccionext, capacidadext, nivelesext }) {
    const [idpropietario, setPropietario] = useState('');
    const [direccion, setDireccion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [niveles, setNiveles] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createPropietario({
                "id_persona": idpropietario,
                "id_vivienda": id
            });
            await updateVivienda(id, {
                "direccion": direccion !== '' ? direccion : direccionext,
                "capacidad": capacidad !== '' ? parseInt(capacidad) : parseInt(capacidadext),
                "niveles": niveles !== '' ? parseInt(niveles) : parseInt(nivelesext)
            });
            Swal.fire('Éxito', 'La vivienda se actualizó correctamente', 'success');
            onClose();
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Editar Vivienda</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="idpropietario" className="mb-2"> Agregar propietario</label>
                                <input id="idpropietario" type="text" value={idpropietario} onChange={e => setPropietario(e.target.value)} placeholder="Id propietario" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="direccion" className="mb-2">Cambiar dirección</label>
                                <input id="direccion" type="text" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Dirección" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="capacidad" className="mb-2">Cambiar capacidad</label>
                                <input id="capacidad" type="number" value={capacidad} onChange={e => setCapacidad(e.target.value)} placeholder="Capacidad" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="niveles" className="mb-2">Cambiar niveles</label>
                                <input id="niveles" type="number" value={niveles} onChange={e => setNiveles(e.target.value)} placeholder="Niveles" className="p-2 border rounded" />
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