import {Router} from "express";
import {pool} from "../db.js";

const router = Router();

// CREATE 
router.post("/propietario", async (req, res) => {
    try {
        const { id_persona, id_vivienda } = req.body;
        const propietarioTemp = await pool.query(
            "INSERT INTO propietario (id_persona, id_vivienda) VALUES($1, $2) RETURNING *",
            [id_persona, id_vivienda]
        );

        res.json(propietarioTemp.rows[0]);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// READ 
router.get("/propietario", async (req, res) => {
    try {
        const allPropiedad = await pool.query("SELECT * FROM propietario");
        res.json(allPropiedad.rows);
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// READ todas las viviendas de un propietario o todas los propietarios de una vivienda
router.get("/propietario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const propiedad = await pool.query("SELECT * FROM propietario WHERE id_vivienda = $1", [id]);
        res.json(propiedad.rows);

    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});


// UPDATE propiedad especifica con propietario especifico
router.put("/propietario-propiedad/", async (req, res) => {
    try {
        const { id_personaNuevo, id_viviendaNuevo, id_persona, id_vivienda } = req.body;
        const updateTodo = await pool.query(
            "UPDATE propietario SET id_persona = $1, id_vivienda = $2 WHERE id_persona = $3 AND id_vivienda = $4",
            [id_personaNuevo, id_viviendaNuevo, id_persona, id_vivienda]
        );

        res.json("datos de propietario actualizados");
    } catch (err) {
        res.json(err.message);
        console.error(err.message);
    }
});

// DELETE propiedad especifica con propietario especifico
router.delete("/propietario-propiedad/", async (req, res) => {
    try {
        const { id_persona, id_vivienda } = req.body;
        const deletePropiedad = await pool.query("DELETE FROM propietario WHERE id_persona = $1 AND id_vivienda = $2",
            [id_persona, id_vivienda]
        );

        res.json("datos de propietario eliminados");
    } catch (err) {
        res.json(err.message);
        console.log(err.message);
    }
});

router.get("/propietariop/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si la persona tiene alguna propiedad
      const propiedadCount = await pool.query(
        "SELECT COUNT(*) FROM propietario WHERE id_persona = $1",
        [id]
      );
  
      if (parseInt(propiedadCount.rows[0].count) === 0) {
        return res.json({ message: "Esta persona no tiene ninguna propiedad asociada." });
      }
  
      // Si tiene propiedad, obtener los detalles de las viviendas
      const propiedad = await pool.query(
        "SELECT v.id_vivienda, v.direccion, v.capacidad, v.niveles FROM propietario p " +
        "JOIN vivienda v ON p.id_vivienda = v.id_vivienda WHERE p.id_persona = $1",
        [id]
      );
      
      res.json(propiedad.rows);
  
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  });

  router.get("/propietariov/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si la vivienda tiene propietario
      const propietarioCount = await pool.query(
        "SELECT COUNT(*) FROM propietario WHERE id_vivienda = $1",
        [id]
      );
  
      if (parseInt(propietarioCount.rows[0].count) === 0) {
        return res.json({ message: "Esta vivienda no tiene propietario asociado." });
      }
  
      // Si tiene propietario, obtener los detalles de la persona
      const propietario = await pool.query(
        "SELECT p.id_persona, p.nombre, p.documento, p.celular, p.edad, p.sexo FROM propietario pr " +
        "JOIN persona p ON pr.id_persona = p.id_persona WHERE pr.id_vivienda = $1",
        [id]
      );
  
      res.json(propietario.rows);
  
    } catch (err) {
      res.json(err.message);
      console.error(err.message);
    }
  });

export default router;