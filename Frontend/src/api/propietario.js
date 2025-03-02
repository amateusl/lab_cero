import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

// Crear una nueva propiedad (propietario y vivienda)
export const createPropietario = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/propietario`, data);
        return response.data;
    } catch (error) {
        console.error("Error creando propietario:", error);
        throw error;
    }
};

// Obtener todas las relaciones propietario-vivienda
export const getPropietarios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/propietario`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo propietarios:", error);
        throw error;
    }
};

// Obtener todas las viviendas de un propietario o todos los propietarios de una vivienda
export const getPropietarioById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/propietario/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo propiedad con ID ${id}:`, error);
        throw error;
    }
};

// Actualizar una relación propietario-vivienda específica
export const updatePropietario = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/propietario-propiedad/`, data);
        return response.data;
    } catch (error) {
        console.error("Error actualizando propietario:", error);
        throw error;
    }
};

// Eliminar una relación propietario-vivienda específica
export const deletePropietario = async (data) => {
    try {
        const response = await axios.delete(`${BASE_URL}/propietario-propiedad/`, {
            data,
        });
        return response.data;
    } catch (error) {
        console.error("Error eliminando propietario:", error);
        throw error;
    }
};

// Obtener todas las propiedades de una persona
export const getPropiedadesDePersona = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/propietariop/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo propiedades de la persona con ID ${id}:`, error);
        throw error;
    }
};

// Obtener el propietario de una vivienda específica
export const getPropietarioDeVivienda = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/propietariov/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo propietario de la vivienda con ID ${id}:`, error);
        throw error;
    }
};
