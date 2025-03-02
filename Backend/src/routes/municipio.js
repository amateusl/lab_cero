import {Router} from "express";
import {pool} from "../db.js";
import { createMunicipio, getMunicipio, updateMunicipio, deleteMunicipio } from "../controllers/municipiocontroller.js";
const router = Router();


router.post("/municipio", createMunicipio); //crear municipio
router.get("/municipio", getMunicipio); //obtener municipios
router.put("/municipio/:id",updateMunicipio );//actualizar municipio
router.delete("/municipio/:id",deleteMunicipio ); //eliminar municipio
 //Obtener la persona que gobierna un municipio y la vivienda ubicada en ese municipio:
 router.get("/municipio-info/:id_municipio", async (req, res) => {
    try {
      const { id_municipio } = req.params;
  
      
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
  
      
      const gobernanteQuery = await pool.query(
        `SELECT p.nombre, p.documento, p.celular, p.edad, p.sexo
         FROM gobierna g
         JOIN persona p ON g.id_persona = p.id_persona
         WHERE g.id_municipio = $1`,
        [id_municipio]
      );
  
      if (gobernanteQuery.rows.length === 0) {
        return res.status(404).json({ message: "Este municipio no tiene gobernante." });
      }
  
      const gobernante = gobernanteQuery.rows[0];
  
      
      const viviendasQuery = await pool.query(
        `SELECT v.id_vivienda, v.direccion, v.capacidad, v.niveles
         FROM ubicado_en u
         JOIN vivienda v ON u.id_vivienda = v.id_vivienda
         WHERE u.id_municipio = $1`,
        [id_municipio]
      );
  
      res.json({
        municipio: {
          id_municipio,
          nombre: municipio.nombre,
          area: municipio.area,
          altitud: municipio.altitud,
          gobernante,
          viviendas: viviendasQuery.rows
        }
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error al obtener los datos" });
    }
  });


  
  
  
export default router;