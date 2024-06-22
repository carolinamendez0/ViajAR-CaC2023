require('dotenv').config();
const express = require ("express")
const app = express()
const http = require ("http")
const cors = require ("cors")
const path = require('path');

// const posteosRouter = require ("./routes/posteosRouter.js")
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json()) //  analizados en formato req.body

app.use(express.static(path.join(__dirname, 'public')));

    /* PEDIDO HTTP/RUTA - FUNCION = CONTROLER     */
   // Configuración de la ruta para renderizar index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});
app.get('/patagonia', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/patagonia.html'));
});
app.get('/norte', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/norte.html'));
});
app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/nosotros.html'));
});
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/contacto.html'));
});
app.listen (port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
})
