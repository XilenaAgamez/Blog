
const prueba = (req, res)=>{

    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    });

}

const curso = (req, res)=>{

    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    });

}


const crear = (req, res)=>{
    // Recoger parametros a guardar

    // Validar datos

    // crear objeto a guardar

    // Asignar valores a objeto basado en el modelo(manual o automatico)

    // Guardar articulo en la base de datos

    // Devolver resultados

    return res.status(200).json({
        mensaje: "Acción de guardar"
    });
}

module.exports = {
    prueba,
    curso,
    crear
}