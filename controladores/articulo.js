const fs = require("fs");
const validator = require("validator");
const Articulo = require("../modelos/Articulo");


const crear = async function(req,res){
    var parametros = req.body;

    try {
        let validar_titulo =! validator.isEmpty(parametros.titulo) &&
                              validator.isLength(parametros.titulo, {min:5, max: undefined});
        let validar_contenido =! validator.isEmpty(parametros.contenido);

        if(!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la informacion");
        }
        
    } catch (error) {
        return res.status(400).json({
            statu: "Error",
            mensaje: "Faltan datos"
        });
    }
  
    //registro
    try{    
        var reg = await Articulo.create(parametros);
        /*res.status(200).send({parametros:reg});*/

        return res.status(200).json({
            status: "success",
            parametros:reg,
            mensaje: "Articulo guardado con exito"
        });

    }catch (error) {
        return res.status(400).json({
            statu: "Error",
            mensaje: "No se pudo guardar el registro"
        });
    }
}


const listar = async function(req,res){
    await Articulo.find({})    
    //limit: permite listar solo cantidad limitada en este caso 3
    //sort: Permite organizar por el campo que deseemos en este caso fecha de manera descendente
    .limit(3)
    .sort({fecha: -1})

    .then((articulos) => {
        return res.status(200).json({
            status: "success",
            contador: articulos.length,
            articulos
        });
       
    }).catch((error) => {
        return res.status(400).json({
            status: "error",
            mensaje: "No se han encontrado articulox"
        });
    });
}


const uno = async function(req,res){
    //Recoger un Id por URL
    let id = req.params.id;
    //Buscar el articulo
    await Articulo.findById(id) 
    .then((articulo) => {
        return res.status(200).json({
            status: "success",
            articulo
        });
       
    }).catch((error) => {
        return res.status(400).json({
            status: "error",
            mensaje: "No se han encontrado articulox"
        });
    
    })
   
}



const eliminar = async  function(req, res){
    let art_id = req.params.id;

    Articulo.findByIdAndDelete({_id: art_id})

    .then((articuloBorrado) => {
        return res.status(200).json({
            status: "succes",
            articulo: articuloBorrado,
            mensaje: "Mensaje de borrado"
        })
       
    }).catch((error) => {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar"
        });
    
    })
}


const editar = async function(req, res){
    //Recoger el id a editar
    let art_id = req.params.id;
    //Recoger datos del body
    let parametros = req.body

    //Validar datos 
    try {
        let validar_titulo =! validator.isEmpty(parametros.titulo) &&
                              validator.isLength(parametros.titulo, {min:5, max: undefined});
        let validar_contenido =! validator.isEmpty(parametros.contenido);

        if(!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la informacion");
        }
        
    } catch (error) {
        return res.status(400).json({
            statu: "Error",
            mensaje: "Faltan datos"
        });
    }

    //Buscar y actualizar articulo
    Articulo.findByIdAndUpdate({_id: art_id}, parametros, {new: true})
    //Devolver respuesta
    .then((articuloeditado) => {
        return res.status(200).json({
            status: "succes",
            articulo: articuloeditado,
            mensaje: "Articulo editado"
        })
       
    }).catch((error) => {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al editar"
        });
    
    });
}

const subir = async function(req, res){

    //configurar multer

    //recoger el fichero de imagen subido

    if(!req.file || !req.files){
        return res.status(404).json({
            status: "Error",
            mensaje: "Peticion invalida"
        });

    }

    //Nombre del archivo
    let archivo= req.file.originalname;

    //Extension del archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];

    //Comprobar extension correcta

    if(extension != "png" && extension != "jpg" 
        && extension!= "jpeg" && extension !="gif"){
            //Borrar archivo y dar respuesta
            fs.unlink(req.file.path, (error) =>{
                return res.status(400).json({
                    status: "Error",
                    mensaje : "Imagen invalida"
                });
            })
    }else{
         //Si todo va bien vamos actualzar el archivo
        return res.status(200).json({
            status: "ok",
            archivo_split,
            files: req.file
        });
    }
}



module.exports = {
    crear,
    listar,
    uno,
    eliminar,
    editar,
    subir
}