const express = require("express");
const router = express.Router();

const multer = require("multer");
const ArticuloControlador = require("../controladores/articulo");


const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos/');
    },

    filename:(req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento});




//ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.eliminar);
router.put("/articulo/:id", ArticuloControlador.editar);
router.post("/subir_imagen/:id", [subidas.single("file")], ArticuloControlador.subir)

module.exports = router;