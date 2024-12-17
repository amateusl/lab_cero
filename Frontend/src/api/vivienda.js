import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const getViviendas = async () => {
    const res = await axios.get(`${url}/vivienda`);
    return res.data;
}

export const getVivienda = async (id) => {
    const res = await axios.get(`${url}/vivienda/${id}`);
    return res.data;
}

export const createVivienda = async (data) => {
    const res = await axios.post(`${url}/vivienda`, data);
    return res.data;
}

export const updateVivienda = async (id, data) => {
    const res = await axios.put(`${url}/vivienda/${id}`, data);
    return res.data;
}
export const deleteVivienda = async (id) => {
    const res = await axios.delete(`${url}/vivienda/${id}`);
    return res.data;
}