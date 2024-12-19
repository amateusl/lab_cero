import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/vivienda/modal-vivienda';
import ConfirmModal from '../modal/vivienda/modal-vivienda-delete';
import PropietariosModal from '../modal/vivienda/modal-propietarios';

function Card({ id, direccion, capacidad, niveles, municipio }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isPropietariosModalOpen, setIsPropietariosModalOpen] = useState(false);
    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };
    const handlePropietariosClick = () => {
        setIsPropietariosModalOpen(true);
    };

    const handleClosePropietariosModal = () => {
        setIsPropietariosModalOpen(false);
    };

    return (
        <div className="card bg-color-4 rounded-xl p-4 shadow-lg font-lexend h-fit" key={id}>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faHome} size="xl" />
                <h2 className='ml-4 text-bold text-lg'>{direccion}</h2>
            </div>
            <p>Id: {id}</p>
            <p>Municipio: {municipio}</p>
            <p>Capacidad: {capacidad}</p>
            <p>Niveles: {niveles}</p>
            <button onClick={handleEditClick} className='mr-5 mt-2'>
                <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
            <button onClick={handleDeleteClick} className='mr-5 mt-2'>
                <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
            </button>
            <button onClick={handlePropietariosClick} className="border-2 border-color-4 pl-1 pr-1 rounded-xl">Propietario(s)</button>
            {isEditModalOpen && <Modal onClose={handleCloseEditModal} id={id} direccionext={direccion} capacidadext={capacidad} nivelesext={niveles} />}
            {isConfirmModalOpen && <ConfirmModal onClose={handleCloseConfirmModal} id={id} />}
            {isPropietariosModalOpen && <PropietariosModal onClose={handleClosePropietariosModal} id={id} />}
        </div>
    )
}

export default Card;