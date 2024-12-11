import {Router} from "express";
import {pool} from "../db.js";
import { createMunicipio, getMunicipioById, getMunicipio, updateMunicipio, deleteMunicipio } from "../controllers/municipiocontroller.js";
const router = Router();


router.post("/municipio", createMunicipio); //crear municipio
router.get("/municipio", getMunicipio); //obtener municipios
router.get("/municipio/:id",getMunicipioById); //obtener municipio por id
router.put("/municipio/:id",updateMunicipio );//actualizar municipio
router.delete("/municipio/:id",deleteMunicipio ); //eliminar municipio

export default router;