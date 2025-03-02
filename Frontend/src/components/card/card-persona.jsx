import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/persona/modal-persona'
import ConfirmModal from '../modal/persona/modal-persona-delete'
import DependientesModal from '../modal/persona/modal-dependientes'
import { useState } from 'react'
function Card({ id, nombre, documento, celular, edad, sexo }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDependientesModalOpen, setIsDependientesModalOpen] = useState(false);

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
    const handleDependientesClick = () => {
        setIsDependientesModalOpen(true);
    };

    const handleCloseDependientesModal = () => {
        setIsDependientesModalOpen(false);
    };
    return (
        <div className="card bg-color-4 rounded-xl p-4 shadow-lg font-lexend h-fit" key={id}>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} size="xl" />
                <h2 className='ml-4 text-bold text-lg'>{nombre}</h2>
            </div>
            <p>Id: {id}</p>
            <p>Documento: {documento}</p>
            <p>Celular: {celular}</p>
            <p>Edad: {edad} años</p>
            <p>Sexo: {sexo}</p>
            <button onClick={handleEditClick} className='mr-5 mt-2'>
                <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
            <button onClick={handleDeleteClick} className='mr-5 mt-2'>
                <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
            </button>
            <button onClick={handleDependientesClick} className="border-2 border-color-4 pl-1 pr-1 rounded-xl">Dependientes</button>
            {isEditModalOpen && <Modal onClose={handleCloseEditModal} id={id} edad={edad} extnombre={nombre} extdocumento={documento} extcelular={celular} extsexo={sexo} />}
            {isConfirmModalOpen && <ConfirmModal onClose={handleCloseConfirmModal} id={id} />}
            {isDependientesModalOpen && <DependientesModal onClose={handleCloseDependientesModal} id={id} />}
        </div>
    )
}

export default Card;