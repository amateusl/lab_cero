import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const getTrabajos = async () => {
    const res = await axios.get(`${url}/trabajo/`);
    return res.data;
}

export const createTrabajo = async (trabajo) => {
    const res = await axios.post(`${url}/trabajo/`, trabajo);
    return res.data;
}

export const getTrabajoById = async (id) => {
    const res = await axios.get(`${url}/trabajo/${id}`);
    return res.data;
}

export const deleteTrabajo = async (id) => {
    const res = await axios.delete(`${url}/trabajo/${id}`);
    return res.data;
}