import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export async function getGobiernaById(id) {
    return await axios.get(`${url}/gobierna/${id}`);
}
export async function getGobiernaByIdPerson(id) {
    return await axios.get(`${url}/gobiernap/${id}`);
}
export async function createGobierna(data) {
    return await axios.post(`${url}/gobierna`, data);
}

export async function updateGobierna(data) {
    return await axios.put(`${url}/gobierna-municipio`, data);
}

export async function deleteGobierna(id) {
    return await axios.delete(`${url}/gobierna/${id}`);
}