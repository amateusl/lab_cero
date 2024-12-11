import {pool} from "../db.js";

export const createVivienda = async (req, res) => {
    try {
      const { direccion, capacidad, niveles } = req.body;
      const viviendaTemp = await pool.query(
        "INSERT INTO vivienda (direccion, capacidad, niveles) VALUES($1, $2, $3) RETURNING *",
        [direccion, capacidad, niveles]
      );
  
      res.json(viviendaTemp.rows[0]);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const getVivienda = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM vivienda");
      res.json(allTodos.rows);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const getViviendaById = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM vivienda WHERE id_vivienda = $1",
        [id]
      );
  
      res.json(todo.rows[0]);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

  export const updateVivienda = async (req, res) => {
    try {
      const { id } = req.params;
      const { direccion, capacidad, niveles } = req.body;
      const updateTodo = await pool.query(
        "UPDATE vivienda SET direccion = $2, capacidad = $3, niveles = $4 WHERE id_vivienda = $1",
        [id, direccion, capacidad, niveles]
      );
  
      res.json("datos de vivienda actualizados");
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const deleteVivienda = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM vivienda WHERE id_vivienda = $1",
        [id]
      );
      res.json("datos de vivienda eliminados");
    } catch (err) {
      res.json(err.message);
      console.log(err.message);
    }
  }