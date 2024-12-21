const mysql = require("mysql2");

// Create a new MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "personas"
})

connection.connect(function(error){
    if(error) {
        console.error(error);
    }
    else {
        console.log("Conectado a la base de datos!");
    }
});

module.exports = connection;