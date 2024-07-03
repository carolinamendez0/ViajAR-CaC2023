const PaquetesModel = require ("../models/PaquetesModel.js")
const DestinosModel= require ("../models/DestinosModel.js")


/* CRUD */
//LEER TODOS LOS PAQUETES
const traerPaquetes= async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const paquetes = await PaquetesModel.findAll() // metodo de sequelize
        res.json(paquetes)
        console.log("Trayendo OK desde la BD todos los paquetes");
        
    } catch (error) {
        res.json({message: error.message})
        
    }
}

const traerunPaquete= async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const paquetes = await PaquetesModel.findOne({ where: { idpaquetes: req.params.id } }) // metodo de sequelize
        // Esto deberia ir en el controlador de destinos, y si necesito los datos consumir su endpoints , cambiarlo despues 
        const destinos = await DestinosModel.findOne({ where: { iddestino: `${paquetes.id_destinos}` } }) // metodo de sequelize
        res.json({paquetes,destinos})
    } catch (error) {
        res.json({message: error.message})
   }
}

module.exports= {traerPaquetes,traerunPaquete}