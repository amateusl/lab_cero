import { deletePersona } from "../../../api/persona";
import { getGobiernaByIdPersona } from "../../../api/gobierna";
import { getPropietarioById } from "../../../api/propietario";
import Swal from 'sweetalert2';
function ConfirmModal({ onClose, id }) {
    const handleConfirmClick = async () => {
        try {
            const gobierna = await getGobiernaByIdPersona(id);
            const propietario = await getPropietarioById(id);
            console.log(propietario);
            if (gobierna.length > 0 && gobierna[0].id_municipio || propietario.length > 0) {
                Swal.fire('Error', 'La persona es un alcalde o propietario de casa, primero modifica alguna de esasa opciones', 'error');
            } else {
                await deletePersona(id);
                Swal.fire('Eliminado', 'Elemento eliminado', 'success')
                    .then(() => {
                        window.location.reload();
                        onClose();
                    });
            }
        } catch (error) {
            Swal.fire('Error', 'Error eliminando persona: ' + error, 'error');
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Confirmación de eliminación
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        ¿Estás seguro de que quieres eliminar esta persona?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleConfirmClick}>
                            Eliminar
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;