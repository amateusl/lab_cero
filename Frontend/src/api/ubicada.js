import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export async function getUbicadaById(id) {
    return await axios.get(`${url}/ubicada/${id}`);
}
export const createUbicada = async (data) => {
    const res = await axios.post(`${url}/ubicada`, data);
    return res.data;
}

export const getUbicadaByIdMunicipio = async (id) => {
    const res = await axios.get(`${url}/ubicadam/${id}`);
    return res.data;
}