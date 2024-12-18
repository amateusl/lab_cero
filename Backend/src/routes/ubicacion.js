import {Router} from "express";
import {pool} from "../db.js";
import { createUbicacion, getUbicacion} from "../controllers/ubicacion_controller.js";
const router = Router();



router.post("/ubicacion", createUbicacion); //crear ubicacion
router.get("/ubicacion", getUbicacion);//obtener ubicaciones

// Obtener todas las viviendas de un ubicada o todas los ubicadas de una vivienda
router.get("/ubicacion/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ubicacion = await pool.query("SELECT * FROM ubicado_en WHERE id_vivienda = $1", [id]);
        res.json(ubicacion.rows);

    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

router.get("/ubicacionm/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ubicacion = await pool.query("SELECT * FROM ubicado_en WHERE id_municipio = $1", [id]);
        res.json(ubicacion.rows);

    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// Obtener municipio especifica con ubicada especifico
router.get("/ubicacionm/", async (req, res) => {
    try {
        const { id_vivienda, id_municipio } = req.body;

        const ubicacion = await pool.query("SELECT * FROM ubicado_en WHERE id_vivienda = $1 AND id_municipio = $2",
            [id_vivienda, id_municipio]);

        res.json(ubicacion.rows[0]);


    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// UPDATE municipio especifica con ubicada especifico
router.put("/ubicacionm/", async (req, res) => {
    try {
        const { id_viviendaNuevo, id_municipioNuevo, id_vivienda, id_municipio } = req.body;
        const ubicacion = await pool.query(
            "UPDATE ubicado_en SET id_vivienda = $1, id_municipio = $2 WHERE id_vivienda = $3 AND id_municipio = $4",
            [id_viviendaNuevo, id_municipioNuevo, id_vivienda, id_municipio]
        );

        res.json("datos de ubicada actualizados");
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// DELETE municipio especifica con ubicada especifico
router.delete("/ubicacionm/", async (req, res) => {
    try {
        const { id_vivienda, id_municipio } = req.body;
        const ubicacion = await pool.query("DELETE FROM ubicado_en WHERE id_vivienda = $1 AND id_municipio = $2",
            [id_vivienda, id_municipio]
        );

        res.json("datos de ubicada eliminados");
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});
export default router;