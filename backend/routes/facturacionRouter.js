const express = require ("express")
const router = express.Router()
const path = require('path');

router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON



const {crearUnaFacturacion, traerFacturacion , traerUnaFacturacion} = require ("../controllers/facturacionController.js")

router.get("/", traerFacturacion) 
router.post("/", crearUnaFacturacion) 
router.get("/:id",traerUnaFacturacion) 




module.exports= router