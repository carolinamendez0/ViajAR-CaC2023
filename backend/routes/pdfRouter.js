const express = require ("express")
const router= express.Router()
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


const { generateTicket } = require("../controllers/pdfController.js")
// router.get("/", generateTicket)
router.post('/generate-ticket', generateTicket)
module.exports= router
