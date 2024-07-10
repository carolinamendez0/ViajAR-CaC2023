const express = require ("express")
const router= express.Router()
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


const {traerDestinos,traerunDestino,crearDestino,actualizarDestino,borrarDestino } = require ("../controllers/destinosControllers.js")

router.get ("/",traerDestinos) 
router.get ("/:id",traerunDestino)
router.post ("/",crearDestino) 
router.put ("/:id",actualizarDestino ) 
router.delete ("/:id",borrarDestino)
// module.exports= router

module.exports= router