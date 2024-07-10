const destinoModel = require ("../models/DestinosModel.js")


/* CRUD */
//GET TODOS LOS destinos
const traerDestinos= async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const destinos = await destinoModel.findAll() // metodo de sequelize
        res.json(destinos)
        console.log("Trayendo OK desde la BD todos los destinos");
        
    } catch (error) {
        res.json({message: error.message})
        
    }
}

const traerunDestino= async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const destinos = await destinoModel.findOne({ where: { iddestino: req.params.id } }) // metodo de sequelize
        // Esto deberia ir en el controlador de destinos, y si necesito los datos consumir su endpoints , cambiarlo despues 
        // const destinos = await DestinosModel.findOne({ where: { iddestino: `${paquetes.id_destinos}` } }) // metodo de sequelize
        res.json({destinos})
    } catch (error) {
        res.json({message: error.message})
   }
}

const actualizarDestino= async (req,res)=>{
    try {
        const destinoExist = await destinoModel.findOne({ where: { iddestino: req.params.id } });
        if (!destinoExist) {
            return res.status(404).json({ message: "Paquete no encontrado" });
        }
        console.log(req.body);
      // Consulta con Op.ne (Operador not equal):
        // Actualizar el paquete con los nuevos datos
        await destinoExist.update(req.body);
        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


  const crearDestino= async (req,res)=>{
    try {
    // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    const { titulo_destino, region_destino, ciudad, provincia,pais } = req.body;
    const nuevoDestino = await destinoModel.create({
        titulo_destino,
        region_destino,
        ciudad,
        provincia,
        pais
    });
        
    console.log(nuevoDestino)
       return res.status(201).json({ message: "Destino creado exitosamente", destino: nuevoDestino });
    } catch (error) {
      //  console.error("Error en la solicitud:", error.message);
      console.log(error)
        return res.status(500).json({ message: "Error en el servidor al crear Paquete" });
    }
}

  const borrarDestino= async (req,res)=>{
      try {
          const destino = await destinoModel.destroy({ where: { iddestino: req.params.id } })
        res.json({"message": "Destino Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}

module.exports = { traerDestinos, traerunDestino, actualizarDestino ,crearDestino,borrarDestino}