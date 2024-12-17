import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export async function getDependientes(es_id_de_dependiente, data) {
    return await axios.get(`${url}/dependiente/${es_id_de_dependiente}`, data);
}

export async function createDependiente(data) {
    return await axios.post(`${url}/dependiente`, data);
}

export async function deleteDependiente(data) {
    console.log(data);
    return await axios.delete(`${url}/dependiente-cabeza/`, { data });
}