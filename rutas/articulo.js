const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

//ruta de prueba
router.get("/ruta", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

//ruta util
router.post("/crear", ArticuloControlador.crear);

module.exports= router;