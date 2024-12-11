import {Router} from "express";
import {pool} from "../db.js";
import { createVivienda, getVivienda, getViviendaById, updateVivienda, deleteVivienda } from "../controllers/vivienda_controller.js";

const router = Router();

router.post("/vivienda", createVivienda); //crear vivienda
router.get("/vivienda", getVivienda); //obtener viviendas
router.get("/vivienda/:id", getViviendaById); //obtener vivienda por id
router.put("/vivienda/:id", updateVivienda ); //actualizar vivienda
router.delete("/vivienda/:id", deleteVivienda); //eliminar viviendas

export default router;