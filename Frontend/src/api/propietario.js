import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const getPropietarioById = async (id, data) => {
    const res = await axios.get(`${url}/propietario/${id}`, data);
    return res.data;
}
export const getPropietarioByIdPerson = async (id) => {
    const res = await axios.get(`${url}/propietariop/${id}`);
    return res.data;
}
export const createPropietario = async (data) => {
    const res = await axios.post(`${url}/propietario`, data);
    return res.data;
}