import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

// Obtener todos los dependientes
export const getDependientes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dependiente`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo dependientes:", error);
    throw error;
  }
};

// Crear un nuevo dependiente
export const createDependiente = async (dependiente) => {
  try {
    const response = await axios.post(`${BASE_URL}/dependiente`, dependiente);
    return response.data;
  } catch (error) {
    console.error("Error creando dependiente:", error);
    throw error;
  }
};

// Obtener un dependiente por ID
export const getDependienteById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/dependiente/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo dependiente con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un dependiente
export const updateDependiente = async (id, dependiente) => {
  try {
    const response = await axios.put(`${BASE_URL}/dependiente/${id}`, dependiente);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando dependiente con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un dependiente
export const deleteDependiente = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/dependiente/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando dependiente con ID ${id}:`, error);
    throw error;
  }
};

// Verificar si una persona es cabeza de familia
export const checkCabezaDeFamilia = async (id_persona) => {
  try {
    const response = await axios.get(`${BASE_URL}/dependiente-cabeza/${id_persona}`);
    return response.data;
  } catch (error) {
    console.error(`Error verificando si la persona es cabeza de familia con ID ${id_persona}:`, error);
    throw error;
  }
};

// Verificar si una persona depende de alguien
export const checkDependencia = async (id_persona) => {
  try {
    const response = await axios.get(`${BASE_URL}/dependientede/${id_persona}`);
    return response.data;
  } catch (error) {
    console.error(`Error verificando dependencia de la persona con ID ${id_persona}:`, error);
    throw error;
  }
};

// Actualizar cabeza de familia de un dependiente
export const updateCabezaFamilia = async (dependienteNuevo, cabezaFamiliaNuevo, dependiente, cabezaFamilia) => {
  try {
    const response = await axios.put(`${BASE_URL}/dependiente-cabeza`, {
      id_dependienteNuevo: dependienteNuevo,
      id_cabeza_familiaNuevo: cabezaFamiliaNuevo,
      id_dependiente: dependiente,
      id_cabeza_familia: cabezaFamilia
    });
    return response.data;
  } catch (error) {
    console.error("Error actualizando cabeza de familia:", error);
    throw error;
  }
};

// Eliminar dependencia de cabeza de familia
export const deleteCabezaFamilia = async (dependiente, cabezaFamilia) => {
  try {
    const response = await axios.delete(`${BASE_URL}/dependiente-cabeza`, {
      data: { id_dependiente: dependiente, id_cabeza_familia: cabezaFamilia }
    });
    return response.data;
  } catch (error) {
    console.error("Error eliminando dependencia de cabeza de familia:", error);
    throw error;
  }
};
