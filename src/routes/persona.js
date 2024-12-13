import {Router} from "express";
import {pool} from "../db.js";
import { getPersonas,CreatePersona,getPersonaById,updatePersona,deletePersona} from "../controllers/personacontroller.js";

const router = Router();


router.get("/persona",getPersonas); //obtener personas
router.post("/persona", CreatePersona); //crear persona
router.get("/persona/:id",getPersonaById ); //obtener persona
router.put("/persona/:id",updatePersona ); //actualizar persona
router.delete("/persona/:id", deletePersona); //eliminar persona





export default router;