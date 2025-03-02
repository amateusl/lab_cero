import {pool} from "../db.js";

export const createGobierna = async (req, res) => {
    try {
        const { id_persona, id_municipio } = req.body;
        const gobiernaTemp = await pool.query(
            "INSERT INTO gobierna (id_persona, id_municipio) VALUES($1, $2) RETURNING *",
            [id_persona, id_municipio]
        );

        res.json(gobiernaTemp.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const getGobierna = async (req, res) => {
    try {
        const allubicacion = await pool.query("SELECT * FROM gobierna");
        res.json(allubicacion.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}


export const getGobiernaById = async (req, res) => {
    try {
        const { id } = req.params;
        const ubicacion = await pool.query("SELECT * FROM gobierna WHERE id_municipio = $1", [id]);
        res.json(ubicacion.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}