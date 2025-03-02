import { useState } from 'react';
import { createPersona } from '../../../api/persona';
import { getPersonas } from '../../../api/persona';
import Swal from 'sweetalert2';

function CreateModal({ onClose }) {
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [celular, setCelular] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const regex = /^([0-9]+|[a-zA-Z]{2}[0-9]+)$/;
        if (!regex.test(documento)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El documento debe contener al menos un número y exactamente dos letras o ninguna.',
            });
            return;
        }

        if (celular.length !== 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El número de celular debe tener 10 dígitos.',
            });
            return;
        }

        if (!Number.isInteger(Number(edad)) || edad < 1 || edad > 150) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Edad invalida',
            });
            return;
        }

        if (sexo === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, selecciona un sexo.',
            });
            return;
        }

        try {
            const personas = await getPersonas();
            const existingPersona = personas.find(persona => persona.documento === documento);
            if (existingPersona) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El documento ya está en uso por otra persona.',
                });
                return;
            }

            await createPersona({
                "nombre": nombre,
                "documento": documento,
                "celular": celular,
                "edad": edad,
                "sexo": sexo
            });
            onClose();
            Swal.fire({
                title: 'Creado',
                text: 'Persona creada exitosamente.',
                icon: 'success',
                timer: null,
                showConfirmButton: true
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear la persona.',
            });
            console.error('Error creating persona:', error);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Agregar Persona</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="mb-2">Nombre</label>
                                <input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="documento" className="mb-2">Documento</label>
                                <input id="documento" type="text" value={documento} onChange={e => setDocumento(e.target.value)} placeholder="Documento" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="celular" className="mb-2">Celular</label>
                                <input id="celular" type="number" value={celular} onChange={e => setCelular(e.target.value)} placeholder="Numero celular (+57)" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="edad" className="mb-2">Edad</label>
                                <input id="edad" type="number" value={edad} onChange={e => setEdad(e.target.value)} placeholder="Edad en años" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="sexo" className="mb-2">Sexo</label>
                                <select id="sexo" value={sexo} onChange={e => setSexo(e.target.value)} className="p-2 border rounded">
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
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

export default CreateModal;