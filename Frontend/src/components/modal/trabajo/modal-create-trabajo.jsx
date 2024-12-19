import { useState } from 'react';
import { createTrabajo } from '../../../api/trabajo';
import Swal from 'sweetalert2';

function CreateModal({ onClose }) {
    const [cargo, setCargo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [salario, setSalario] = useState('');
    const [idpersona, setIdPersona] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!cargo || !empresa || !salario || !idpersona) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios.',
            });
            return;
        }
        if (salario <= 1000000 || salario >= 2147470000) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El salario debe ser mayor a 1000000 y menor a 2147470000.',
            });
            return;
        }
        try {
            await createTrabajo({
                "cargo": cargo,
                "empresa": empresa,
                "salario": salario,
                "id_persona": idpersona
            });
            onClose();
            Swal.fire({
                title: 'Creado',
                text: 'Trabajo creado exitosamente.',
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Agregar Trabajo</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="cargo" className="mb-2">Cargo</label>
                                <input id="cargo" type="text" value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Nombre del cargo" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="empresa" className="mb-2">Empresa</label>
                                <input id="empresa" type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Nombre de la empresa" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="salario" className="mb-2">Salario</label>
                                <input id="salario" type="number" value={salario} onChange={e => setSalario(e.target.value)} placeholder="Salario a ganar en $(COP)" className="p-2 border rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="idpersona" className="mb-2">Id de la persona</label>
                                <input id="idpersona" type="number" value={idpersona} onChange={e => setIdPersona(e.target.value)} placeholder="Id de la persona para trabajo" className="p-2 border rounded" />
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