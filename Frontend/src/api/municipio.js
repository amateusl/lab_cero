import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

// Crear un municipio
export const createMunicipio = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/municipio`, data);
        return response.data;
    } catch (error) {
        console.error("Error creando municipio:", error);
        throw error;
    }
};

// Obtener todos los municipios
export const getMunicipios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/municipio`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo municipios:", error);
        throw error;
    }
};

// Actualizar un municipio
export const updateMunicipio = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/municipio/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando municipio con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un municipio
export const deleteMunicipio = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/municipio/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error eliminando municipio con ID ${id}:`, error);
        throw error;
    }
};

// Obtener información completa de un municipio (gobernante y viviendas)
export const getMunicipioInfo = async (id_municipio) => {
    try {
        const response = await axios.get(`${BASE_URL}/municipio-info/${id_municipio}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo información del municipio con ID ${id_municipio}:`, error);
        throw error;
    }
};
