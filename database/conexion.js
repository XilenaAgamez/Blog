const mongoose = require("mongoose");

const conexion = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        /*Parametros dentro de un objeto //solo en caso de aviso de error
        useNewUrlParser: true
        useUnifiedTopology: true
        useCreateIndex: true*/

        console.log("se ha conectado correctamente a la bd mi blog");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la bd")
    }
}


module.exports={
    conexion
}