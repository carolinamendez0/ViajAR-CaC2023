const PaquetesModel = require ("../models/PaquetesModel.js")

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
        res.json(paquetes)
        console.log("Trayendo OK desde la BD todos los paquetes");
        
    } catch (error) {
        res.json({message: error.message})
s    }
}

module.exports= {traerPaquetes,traerunPaquete}