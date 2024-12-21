const express = require('express');
const router = require('./router');

const app = express();

app.use(router);

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});