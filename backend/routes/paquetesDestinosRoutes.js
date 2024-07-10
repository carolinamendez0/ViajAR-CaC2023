const express = require ("express")
const router= express.Router()
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


const {traerPaquetesDestinos,traerunPaqueteDestino , traerunDestinoPaquete , crearPaqueteDestino, eliminarPaqueteDestino , actualizarPaqueteDestino} = require ("../controllers/paquetesDestinosController")

router.get ("/",traerPaquetesDestinos) 
router.get("/paquete/:id", traerunPaqueteDestino)
router.get("/destino/:id", traerunDestinoPaquete)
router.post ("/",crearPaqueteDestino) 
router.put ("/:id",actualizarPaqueteDestino ) 
router.delete ("/:id",eliminarPaqueteDestino)
// module.exports= router

module.exports= router