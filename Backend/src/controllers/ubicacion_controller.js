import {pool} from "../db.js";

export const createUbicacion = async (req, res) => {
    try {
        const { id_vivienda, id_municipio } = req.body;
        const ubicadaTemp = await pool.query(
            "INSERT INTO ubicado_en (id_vivienda, id_municipio) VALUES($1, $2) RETURNING *",
            [id_vivienda, id_municipio]
        );

        res.json(ubicadaTemp.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

export const getUbicacion = async (req, res) => {
    try {
        const allubicacion = await pool.query("SELECT * FROM ubicado_en");
        res.json(allubicacion.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

