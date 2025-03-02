import {pool} from "../db.js";

export const createDependiente = async (req, res) => {
    try {
        const { id_dependiente, id_cabeza_familia } = req.body;

        if(id_dependiente === id_cabeza_familia){
            const dependienteTemp = await pool.query(
                "INSERT INTO dependiente (id_dependiente, id_cabeza_familia) VALUES($1, $2) RETURNING *",
                [id_dependiente, id_cabeza_familia]
            );
            res.json(dependienteTemp.rows[0]);
        }
        else{
            const dependencia = await pool.query("SELECT * FROM dependiente WHERE id_dependiente = $1 AND id_cabeza_familia = $2",
            [id_cabeza_familia, id_cabeza_familia]);
            if(dependencia.rows[0]){
                const dependienteTemp = await pool.query(
                    "INSERT INTO dependiente (id_dependiente, id_cabeza_familia) VALUES($1, $2) RETURNING *",
                    [id_dependiente, id_cabeza_familia]
                );
                res.json(dependienteTemp.rows[0]);
            }
            else{
                res.json("el cabeza de familia introducido no esta registrado como cabeza (no se apunta a si mismo)");
            }
            
        }       

    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}


export const getDependiente = async (req, res) => {
    try {
        const allPropiedad = await pool.query("SELECT * FROM dependiente");
        res.json(allPropiedad.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
}

