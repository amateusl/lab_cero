import {Router} from "express";
import {pool} from "../db.js";

const router = Router();

// CREATE 
router.post("/reside", async (req, res) => {
    try {
        const { id_persona, id_vivienda } = req.body;
        const resideTemp = await pool.query(
            "INSERT INTO reside (id_persona, id_vivienda) VALUES($1, $2) RETURNING *",
            [id_persona, id_vivienda]
        );

        res.json(resideTemp.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// Obtener
router.get("/reside", async (req, res) => {
    try {
        const allresidencia = await pool.query("SELECT * FROM reside");
        res.json(allresidencia.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// Obtener todas las viviendas de un reside o todas los resides de una vivienda
router.get("/residep/:id", async (req, res) => { //obtener viviendas donde reside una persona
    try {
        const { id } = req.params;
        const consulta = `
            SELECT 
                p.nombre AS nombre_persona,
                v.direccion,
                v.capacidad,
                v.niveles
            FROM 
                reside r
            JOIN 
                persona p ON r.id_persona = p.id_persona
            JOIN 
                vivienda v ON r.id_vivienda = v.id_vivienda
            WHERE 
                p.id_persona = $1;
        `;
        const resultado = await pool.query(consulta, [id]);
        res.json(resultado.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

router.get("/residev/:id", async (req, res) => { //obtener Personas que residen en una vivienda
    try {
        const { id } = req.params;
        const consulta = `
            SELECT 
                v.direccion,
                v.capacidad,
                v.niveles,
                p.nombre,
                p.documento,
                p.celular,
                p.edad,
                p.sexo
            FROM 
                reside r
            JOIN 
                vivienda v ON r.id_vivienda = v.id_vivienda
            JOIN 
                persona p ON r.id_persona = p.id_persona
            WHERE 
                v.id_vivienda = $1;
        `;
        const resultado = await pool.query(consulta, [id]);
        res.json(resultado.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

router.put("/reside", async (req, res) => {
    try {
        const { id_persona, id_vivienda, nueva_id_vivienda } = req.body;

        const updateResidencia = await pool.query(
            `UPDATE reside 
            SET id_vivienda = $1 
            WHERE id_persona = $2 AND id_vivienda = $3`,
            [nueva_id_vivienda, id_persona, id_vivienda]
        );

        if (updateResidencia.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró la residencia especificada." });
        }

        res.json({ message: "Residencia actualizada exitosamente." });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
});


router.delete("/reside", async (req, res) => {
    try {
        const { id_persona, id_vivienda } = req.body;

        const deleteResidencia = await pool.query(
            `DELETE FROM reside 
            WHERE id_persona = $1 AND id_vivienda = $2`,
            [id_persona, id_vivienda]
        );

        if (deleteResidencia.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró la residencia especificada." });
        }

        res.json({ message: "Residencia eliminada exitosamente." });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
});



export default router;