import {Router} from "express";
import {pool} from "../db.js";
import { createDependiente, getDependiente,getDependienteById} from "../controllers/dependiente_controller.js";
const router = Router();


router.post("/dependiente",createDependiente ); //crear dependiente
router.get("/dependiente",getDependiente ); //obtener dependientes
router.get("/dependiente/:id",getDependienteById ); //obtener dependiente por id
router.get("/dependiente-cabeza/", async (req, res) => {
    try {
        const { id_dependiente, id_cabeza_familia } = req.body;

        const dependencia = await pool.query("SELECT * FROM dependiente WHERE id_dependiente = $1 AND id_cabeza_familia = $2",
        [id_dependiente, id_cabeza_familia]);

        res.json(dependencia.rows[0]);


    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// UPDATE cabeza especifica con dependiente especifico
router.put("/dependiente-cabeza/", async (req, res) => {
    try {
        const { id_dependienteNuevo, id_cabeza_familiaNuevo, id_dependiente, id_cabeza_familia } = req.body;
        const dependencia = await pool.query(
            "UPDATE dependiente SET id_dependiente = $1, id_cabeza_familia = $2 WHERE id_dependiente = $3 AND id_cabeza_familia = $4",
            [id_dependienteNuevo, id_cabeza_familiaNuevo, id_dependiente, id_cabeza_familia]
        );

        res.json("datos de dependiente actualizados");
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// DELETE cabeza especifica con dependiente especifico
router.delete("/dependiente-cabeza/", async (req, res) => {
    try {
        const { id_dependiente, id_cabeza_familia } = req.body;
            const dependencia = await pool.query("DELETE FROM dependiente WHERE id_dependiente = $1 AND id_cabeza_familia = $2",
                [id_dependiente, id_cabeza_familia]
            );
        
        res.json("datos de dependiente eliminados");
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

export default router;