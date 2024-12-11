import {pool} from "../db.js";

export const createTrabajo = async (req, res) => {
    try {
        const { cargo, empresa, salario, id_persona } = req.body;
        const trabajoTemp = await pool.query(
            "INSERT INTO trabajo (cargo, empresa, salario, id_persona) VALUES($1, $2, $3, $4) RETURNING *",
            [cargo, empresa, salario, id_persona]
        );

        res.json(trabajoTemp.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const getTrabajo = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM trabajo");
        res.json(allTodos.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const getTrabajoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM trabajo WHERE id_trabajo = $1",
            [id]
        );

        res.json(todo.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const updateTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const { cargo, empresa, salario, id_persona } = req.body;
        const updateTodo = await pool.query(
            "UPDATE trabajo SET cargo = $2, empresa = $3, salario = $4, id_persona = $5 WHERE id_trabajo = $1",
            [id, cargo, empresa, salario, id_persona]
        );

        res.json("datos de trabajo actualizados");
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const deleteTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM trabajo WHERE id_trabajo = $1",
            [id]
        );
        res.json("datos de trabajo eliminados");
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
}