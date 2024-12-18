import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Cambia si tu backend está en otro dominio o puerto

// Crear una vivienda
export const createVivienda = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/vivienda`, data);
        return response.data;
    } catch (error) {
        console.error("Error creando vivienda:", error);
        throw error;
    }
};

// Obtener todas las viviendas
export const getViviendas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/vivienda`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo viviendas:", error);
        throw error;
    }
};

// Obtener una vivienda por ID
export const getViviendaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/vivienda/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo vivienda con ID ${id}:`, error);
        throw error;
    }
};

// Actualizar una vivienda
export const updateVivienda = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/vivienda/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando vivienda con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar una vivienda
export const deleteVivienda = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/vivienda/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error eliminando vivienda con ID ${id}:`, error);
        throw error;
    }
};
