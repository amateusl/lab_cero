import {Router} from "express";
import {pool} from "../db.js";
import { createVivienda, getVivienda, getViviendaById, updateVivienda, deleteVivienda } from "../controllers/vivienda_controller.js";

const router = Router();

router.post("/vivienda", createVivienda); //crear vivienda
router.get("/vivienda", getVivienda); //obtener viviendas
router.get("/vivienda/:id", getViviendaById); //obtener vivienda por id
router.put("/vivienda/:id", updateVivienda ); //actualizar vivienda
router.delete("/vivienda/:id", deleteVivienda); //eliminar viviendas

router.get("/viviendadetalle/:id", async (req, res) => {
    try {
        const { id } = req.params;

       
        const resultado = await pool.query(`
            SELECT 
                p.nombre AS propietario_nombre,
                p.documento AS propietario_documento,
                m.nombre AS municipio_nombre,
                m.area AS municipio_area,
                m.altitud AS municipio_altitud
            FROM 
                propietario pr
                JOIN persona p ON pr.id_persona = p.id_persona
                JOIN vivienda v ON pr.id_vivienda = v.id_vivienda
                JOIN ubicado_en ue ON v.id_vivienda = ue.id_vivienda
                JOIN municipio m ON ue.id_municipio = m.id_municipio
            WHERE 
                v.id_vivienda = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "No se encontró información para la vivienda proporcionada." });
        }

        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error al obtener los detalles de la vivienda." });
    }
});


export default router;