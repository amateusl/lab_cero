import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export async function getPersonas() {
    return await axios.get(`${url}/persona`);
}

export async function getPersonaById(id) {
    return await axios.get(`${url}/persona/${id}`);
}

export async function createPersona(data) {
    return await axios.post(`${url}/persona`, data);
}

export async function updatePersona(id, data) {
    return await axios.put(`${url}/persona/${id}`, data);
}

export async function deletePersona(id) {
    return await axios.delete(`${url}/persona/${id}`);
}