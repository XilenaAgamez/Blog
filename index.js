const {conexion} = require("./database/conexion");
const express = require("express");
const cors = require("cors");

//inicializar app
console.log("APP DE NODE ARRANCADA");

//conectar bd
conexion();

//Crear servidor Node
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json());

//Rutas
const rutas_articulos = require("./rutas/articulo");

//cargar rutas
app.use("/", rutas_articulos);


//rutas hardcodeadas
app.get("/prueba", (req, res) =>{
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).send({
        curso: "Master en Node",
        autor: "xilena"
    })
});

//crear servidor y escuchar peticiones
app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto "+puerto);
});