import {pool} from "../db.js";

export const getPersonas = async (req, res) => {
    try {
      const obtencionTodos = await pool.query("SELECT * FROM Persona");
      res.json(obtencionTodos.rows);
      // console.log(Array.isArray(obtencionTodos.rows));
      
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const CreatePersona = async (req, res) => {
    try {
      const {  nombre, documento, celular, edad, sexo } = req.body;
      const personaCreada = await pool.query(
        "INSERT INTO Persona ( nombre, documento, celular, edad, sexo) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [ nombre, documento, celular, edad, sexo]
      );
  
      res.json(personaCreada.rows[0]);
    } catch (err) {
      res.json(err.message);
      console.error(err);
    }
  }


export const getPersonaById = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM Persona WHERE id_persona = $1",
        [id]
      );
  
      res.json(todo.rows[0]);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const updatePersona = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, documento, celular, edad, sexo } = req.body;
      const updateTodo = await pool.query(
        "UPDATE Persona SET nombre = $2, documento = $3, celular = $4, edad = $5, sexo = $6 WHERE id_persona = $1",
        [id, nombre, documento, celular, edad, sexo]
      );
  
      res.json("datos de persona actualizados");
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }


export const deletePersona = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM Persona WHERE id_persona = $1",
        [id]
      );
      res.json("datos de persona eliminados");
    } catch (err) {
      res.json(err.message);
      console.log(err.message);
    }
  }