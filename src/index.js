const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();
app.use(cors(({
    origin: [
        'http://127.0.0.1:5502'
    ]
})));
app.use(express.json());
app.use(router);

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});