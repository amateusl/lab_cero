import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export async function getMunicipios() {
    return await axios.get(`${url}/municipio`);

}

export async function getMunicipioById(id) {
    return await axios.get(`${url}/municipio/${id}`);
}

export async function createMunicipio(data) {
    return await axios.post(`${url}/municipio`, data);
}

export async function deleteMunicipio(id) {
    return await axios.delete(`${url}/municipio/${id}`);
}

export async function updateMunicipio(id, data) {
    return await axios.put(`${url}/municipio/${id}`, data);
}