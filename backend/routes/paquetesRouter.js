const express = require ("express")
const router= express.Router()
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


const {traerPaquetes,traerunPaquete,crearUnPaquete,actualizarPaquete,borrarPaquete } = require ("../controllers/paquetesControllers.js")

router.get ("/",traerPaquetes) 
router.get ("/:id",traerunPaquete)
// router.post ("/",crearUnPaquete) 
// router.put ("/:id",actualizarPaquete ) 
// router.delete ("/:id",borrarPaquete)
// module.exports= router

module.exports= router