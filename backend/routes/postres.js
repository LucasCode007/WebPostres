const express = require("express");
const router = express.Router();

const {
  crearPostre,
  obtenerPostres
} = require("../controllers/postresController");

// rutas limpias 👇
router.post("/", crearPostre);
router.get("/", obtenerPostres);

module.exports = router;