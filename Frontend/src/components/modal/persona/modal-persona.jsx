import { useState } from 'react';
import { updatePersona } from '../../../api/persona';
import { createDependiente } from '../../../api/dependiente';
import Swal from 'sweetalert2';

function Modal({ onClose, id, edad, extnombre, extdocumento, extcelular, extsexo }) {
    const [nombre, setNombre] = useState('');
    const [celular, setCelular] = useState('');
    const [sexo, setSexo] = useState('');
    const [dependiente, setDependiente] = useState('');
    const [documento, setDocumento] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (celular && celular.length !== 10) {
                Swal.fire('Error', 'El celular debe tener 10 dígitos', 'error');
                return;
            }
            if (documento && (!/^([a-zA-Z]{2}\d+)$/.test(documento))) {
                Swal.fire('Error', 'El documento debe tener 2 letras y al menos un número', 'error');
                return;
            }
            await updatePersona(id, {
                "nombre": nombre !== '' ? nombre : extnombre,
                "celular": celular !== '' ? celular : extcelular,
                "documento": documento !== '' ? documento : extdocumento,
                "edad": edad,
                "sexo": sexo !== '' ? sexo : extsexo
            });
            if (dependiente) {
                await createDependiente({
                    "id_cabeza_familia": id,
                    "id_dependiente": id,
                });
                await createDependiente({
                    "id_cabeza_familia": id,
                    "id_dependiente": dependiente,
                });
            }
            await Swal.fire('Éxito', 'Persona actualizada correctamente', 'success')
                .then(() => {
                    onClose();
                    window.location.reload();
                });
        } catch (error) {
            Swal.fire('Error', 'Error actualizando persona o agregando el dependiente', 'error');
            console.error('Error updating persona or creating dependiente:', error);
        }
    };
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Editar Persona</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="mb-2">Cambiar nombre</label>
                                <input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="celular" className="mb-2">Cambiar número celular</label>
                                <input id="celular" type="number" value={celular} onChange={e => setCelular(e.target.value)} placeholder="Numero celular (+57)" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="documento" className="mb-2">Cambiar documento</label>
                                <input id="documento" type="text" value={documento} onChange={e => setDocumento(e.target.value)} placeholder="Documento" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <p>Edad</p>
                                <p>{edad} años</p>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="sexo" className="mb-2">Modificar Sexo</label>
                                <select id="sexo" value={sexo} onChange={e => setSexo(e.target.value)} className="p-2 border rounded">
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dependiente" className="mb-2">Agregar un dependiente</label>
                                <input id="dependiente" type="text" value={dependiente} onChange={e => setDependiente(e.target.value)} placeholder="Id del dependiente" className="p-2 border rounded" />
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