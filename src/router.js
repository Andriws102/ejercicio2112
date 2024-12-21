const express = require('express');
const connection = require('./db');
const router = express.Router();

// Definir rutas
router.get("/consulta", function(request, response){
    response.send("Consulta de datos varios");
});

router.get("/personas", function(request, response){
    connection.query("SELECT * FROM personas", function(err, result) {
        if (err) {
            console.error("Error obteniendo las personas", err)
        }else{
            response.json(result);
        }
    }); 
})

router.post("/personas", function(request, response){
    const datos = request.body;

    const query = `INSERT INTO personas (id, nombre, apellido, correo, telefono) 
    VALUES (NULL, '${datos.nombre}', '${datos.apellido}', '${datos.correo}', '${datos.telefono}')`

    connection.execute(query, null, function(error, result){
        if(error){
            console.error("Error insertando la persona", error)
        }else{
            response.json({message: "Persona insertada correctamente", id: result.insertId})
        }
    })
})

module.exports = router;