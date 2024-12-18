import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL; 

// Obtener todas las personas
export const getPersonas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/persona`);

    return response.data;
  } catch (error) {
    console.error("Error obteniendo personas:", error);
    throw error;
  }
};

// Crear una nueva persona
export const createPersona = async (persona) => {
  try {
    const response = await axios.post(`${BASE_URL}/persona`, persona);
    return response.data;
  } catch (error) {
    console.error("Error creando persona:", error);
    throw error;
  }
};

// Obtener una persona por ID
export const getPersonaById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/persona/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo persona con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar una persona
export const updatePersona = async (id, persona) => {
  try {
    const response = await axios.put(`${BASE_URL}/persona/${id}`, persona);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando persona con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una persona
export const deletePersona = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/persona/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando persona con ID ${id}:`, error);
    throw error;
  }
};
