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

module.exports = router;