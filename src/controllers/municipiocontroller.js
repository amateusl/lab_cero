import {pool} from "../db.js";


export const createMunicipio = async (req, res) => {
    try {
      const { nombre, area, altitud } = req.body;
      const municipioTemp = await pool.query(
        "INSERT INTO municipio (nombre, area, altitud) VALUES($1, $2, $3) RETURNING *",
        [nombre, area, altitud]
      );
  
      res.json(municipioTemp.rows[0]);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }


export const getMunicipio = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM municipio");
      res.json(allTodos.rows);
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }



export const updateMunicipio = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, area, altitud } = req.body;
      const updateTodo = await pool.query(
        "UPDATE municipio SET nombre = $2, area = $3, altitud = $4 WHERE id_municipio = $1",
        [id, nombre, area, altitud]
      );
  
      res.json("datos de municipio actualizados");
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  }

export const deleteMunicipio = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM municipio WHERE id_municipio = $1",
        [id]
      );
      res.json("datos de municipio eliminados");
    } catch (err) {
      res.json(err.message);
      console.log(err.message);
    }
  }