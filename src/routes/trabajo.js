import {Router} from "express";
import {pool} from "../db.js";
import { createTrabajo,getTrabajo,getTrabajoById,updateTrabajo,deleteTrabajo} from "../controllers/trabajo_controller.js";
const router = Router();


router.post("/trabajo",createTrabajo ); //crear trabajo
router.get("/trabajo", getTrabajo); //obtener trabajos
router.get("/trabajo/:id",getTrabajoById); //obtener trabajo por id
router.put("/trabajo/:id", updateTrabajo); //actualizar trabajo
router.delete("/trabajo/:id", deleteTrabajo); //eliminar trabajo 

export default router;