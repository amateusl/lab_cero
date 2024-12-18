import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

// Crear gobierna
export const createGobierna = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/gobierna`, data);
        return response.data;
    } catch (error) {
        console.error("Error creando gobierna:", error);
        throw error;
    }
};

// Obtener todos los registros de gobierna
export const getGobiernas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/gobierna`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo gobiernas:", error);
        throw error;
    }
};

// Obtener gobierna por ID de municipio
export const getGobiernaByIdMunicipio = async (id_municipio) => {
    try {
        const response = await axios.get(`${BASE_URL}/gobierna/${id_municipio}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo gobierna con ID de municipio ${id_municipio}:`, error);
        throw error;
    }
};

// Obtener gobernante por ID de persona
export const getGobiernaByIdPersona = async (id_persona) => {
    try {
        const response = await axios.get(`${BASE_URL}/gobiernap/${id_persona}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo gobierna con ID de persona ${id_persona}:`, error);
        throw error;
    }
};

// Obtener gobierna específica (persona y municipio)
export const getGobiernaByPersonaAndMunicipio = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/gobierna-municipio/`, {
            params: data,
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo gobierna específica:", error);
        throw error;
    }
};

// Actualizar gobierna específica (persona y municipio)
export const updateGobierna = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/gobierna-municipio/`, data);
        return response.data;
    } catch (error) {
        console.error("Error actualizando gobierna:", error);
        throw error;
    }
};

// Eliminar gobierna específica (persona y municipio)
export const deleteGobierna = async (data) => {
    try {
        const response = await axios.delete(`${BASE_URL}/gobierna-municipio/`, {
            data,
        });
        return response.data;
    } catch (error) {
        console.error("Error eliminando gobierna:", error);
        throw error;
    }
};
