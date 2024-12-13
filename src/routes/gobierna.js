import {Router} from "express";
import {pool} from "../db.js";
import { createGobierna, getGobiernaById, getGobierna } from "../controllers/gobierna_controller.js";

const router = Router();


router.post("/gobierna",createGobierna); //crear gobierna
router.get("/gobierna",getGobierna ); //obtener gobiernas
//router.get("/gobierna/:id_municipio",getGobiernaById); //obtener gobierna por id

router.get("/gobierna/:id_municipio", async (req, res) => {
    try {
      const { id_municipio } = req.params;
  
      // Consulta para obtener los datos del municipio
      const municipioQuery = await pool.query(
        `SELECT nombre, area, altitud
         FROM municipio
         WHERE id_municipio = $1`,
        [id_municipio]
      );
  
      if (municipioQuery.rows.length === 0) {
        return res.status(404).json({ message: "Municipio no encontrado." });
      }
  
      const municipio = municipioQuery.rows[0];
  
      // Consulta para verificar si el municipio tiene un gobernante
      const gobernanteQuery = await pool.query(
        `SELECT p.nombre, p.documento, p.celular, p.edad, p.sexo
         FROM gobierna g
         JOIN persona p ON g.id_persona = p.id_persona
         WHERE g.id_municipio = $1`,
        [id_municipio]
      );
  
      if (gobernanteQuery.rows.length === 0) {
        return res.status(404).json({ message: "Este municipio no está siendo gobernado." });
      }
  
      const gobernante = gobernanteQuery.rows[0];
  
      res.json({
        municipio: {
          id_municipio,
          nombre: municipio.nombre,
          area: municipio.area,
          altitud: municipio.altitud,
          gobernante
        }
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error al validar el municipio" });
    }
  });
  

router.get("/gobiernap/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ubicacion = await pool.query("SELECT * FROM gobierna WHERE id_persona = $1", [id]);
        res.json(ubicacion.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});


// Obtener municipio especifica con gobierna especifico
router.get("/gobierna-municipio/", async (req, res) => {
    try {
        const { id_persona, id_municipio } = req.body;

        const ubicacion = await pool.query("SELECT * FROM gobierna WHERE id_persona = $1 AND id_municipio = $2",
            [id_persona, id_municipio]);

        res.json(ubicacion.rows[0]);


    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// UPDATE municipio especifica con gobierna especifico
router.put("/gobierna-municipio/", async (req, res) => {
    try {
        const { id_personaNuevo, id_municipioNuevo, id_persona, id_municipio } = req.body;
        const ubicacion = await pool.query(
            "UPDATE gobierna SET id_persona = $1, id_municipio = $2 WHERE id_persona = $3 AND id_municipio = $4",
            [id_personaNuevo, id_municipioNuevo, id_persona, id_municipio]
        );

        res.json("datos de gobierna actualizados");
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// DELETE municipio especifica con gobierna especifico
router.delete("/gobierna-municipio/", async (req, res) => {
    try {
        const { id_persona, id_municipio } = req.body;
        const ubicacion = await pool.query("DELETE FROM gobierna WHERE id_persona = $1 AND id_municipio = $2",
            [id_persona, id_municipio]
        );

        res.json("datos de gobierna eliminados");
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});



export default router;