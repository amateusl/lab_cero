import {Router} from "express";
import {pool} from "../db.js";
import { createTrabajo,getTrabajo,updateTrabajo,deleteTrabajo} from "../controllers/trabajo_controller.js";
const router = Router();


router.post("/trabajo",createTrabajo ); //crear trabajo
router.get("/trabajo", getTrabajo); //obtener trabajos

router.put("/trabajo/:id", updateTrabajo); //actualizar trabajo
router.delete("/trabajo/:id", deleteTrabajo); //eliminar trabajo 


router.get("/trabajop/:id",  async (req, res) => {
    try {
        const { id } = req.params;

        // Consulta combinada para determinar la situación de la persona
        const query = `
            SELECT 
                p.id_persona,
                p.nombre,
                CASE 
                    WHEN g.id_persona IS NOT NULL THEN 'Gobernante'
                    ELSE t.cargo 
                END AS cargo,
                CASE 
                    WHEN g.id_persona IS NOT NULL THEN 'Gobierno'
                    ELSE t.empresa 
                END AS empresa,
                CASE 
                    WHEN g.id_persona IS NOT NULL THEN 0
                    ELSE t.salario 
                END AS salario
            FROM persona p
            LEFT JOIN gobierna g ON p.id_persona = g.id_persona
            LEFT JOIN trabajo t ON p.id_persona = t.id_persona
            WHERE p.id_persona = $1;
        `;

        const resultado = await pool.query(query, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }

        const persona = resultado.rows[0];

        // Si la persona no gobierna y no tiene trabajo, devolver datos vacíos
        if (!persona.cargo && !persona.empresa && persona.salario === null) {
            return res.json({
                id_persona: persona.id_persona,
                cargo: "",
                empresa: "",
                salario: null,
            });
        }

        // Responder con los datos de la persona
        return res.json(persona);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

export default router;