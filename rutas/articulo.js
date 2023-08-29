const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");


//ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.eliminar);
router.put("/articulo/:id", ArticuloControlador.editar);

module.exports = router;