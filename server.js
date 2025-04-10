// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'datos.json');

app.use(express.json());
app.use(express.static('public'));

// Asegurar que el archivo existe
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

// Leer datos del archivo
function leerDatos() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Guardar datos en el archivo
function guardarDatos(nuevoDato) {
    const datos = leerDatos();
    datos.push(nuevoDato);
    fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
}

// Endpoint para guardar datos
app.post('/api/datos', (req, res) => {
    guardarDatos(req.body);
    res.sendStatus(200);
});

// Endpoint para obtener datos
app.get('/api/datos', (req, res) => {
    const datos = leerDatos();
    res.json(datos);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
