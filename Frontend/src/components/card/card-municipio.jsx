import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Modal from '../modal/municipio/modal-municipio';
import ConfirmModal from '../modal/municipio/modal-municipio-delete';

function Card({ id, nombre, area, altitud, idalcalde, nombrealcalde }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

    return (
        <div className="card bg-color-1 rounded-xl p-4 shadow-lg font-lexend h-fit" key={id}>
            <div className="flex items-center text-white">
                <FontAwesomeIcon icon={faCity} size="xl" />
                <h2 className='ml-4 text-bold text-lg'>{nombre}</h2>
            </div>
            <p className="text-white">Id municipio: {id}</p>
            <p className="text-white">Alcalde: {nombrealcalde}</p>
            <p className="text-white">Área: {area} km²</p>
            <p className="text-white">Altitud: {altitud} m</p>
            <button onClick={handleEditClick} className='mr-5 mt-2'>
                <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
            <button onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
            </button>
            {isEditModalOpen && <Modal onClose={handleCloseEditModal} id={id} idalcaldeext={idalcalde} nombrealcaldeext={nombrealcalde} nombreext={nombre} altitudext={altitud} areaext={area} />}
            {isConfirmModalOpen && <ConfirmModal onClose={handleCloseConfirmModal} id={id} />}
        </div>
    )
}

export default Card;