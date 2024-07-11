const PaquetesModel = require ("../models/PaquetesModel.js")
const DestinosModel = require("../models/DestinosModel.js")
const PaquetesDestinosModel= require ("../models/PaquetesDestinosModel.js")



/* CRUD */
const traerPaquetesDestinos = async (req, res) => {
  try {
      const paquetesDestinos = await PaquetesDestinosModel.findAll({
        
      include: [
        { model: PaquetesModel, as: "paquete" },
        { model: DestinosModel, as: "destino" }
      ]
    });
      
    res.json(paquetesDestinos);
    console.log("Trayendo OK desde la BD todos los paquetes y destinos asociados");
  } catch (error) {
      res.json({ message: error.message });
  }
}


const traerunPaqueteDestino = async (req, res) => {
  try {
    const paqueteDestino = await PaquetesDestinosModel.findOne({
      where: { idpaquete: req.params.id },
      include: [
        { model: PaquetesModel, as: "paquete" },
        { model: DestinosModel, as: "destino" }
      ]
    });

    if (!paqueteDestino) {
      // return res.status(404).json({ message: "Paquete destino no encontrado" });
    }

    res.json({ paqueteDestino });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const traerunDestinoPaquete = async (req, res) => {
    try {
    const paqueteDestino = await PaquetesDestinosModel.findOne({
      where: { iddestino: req.params.id },
      include: [
        { model: PaquetesModel, as: "paquete" },
        { model: DestinosModel, as: "destino" }
      ]
    });

    if (!paqueteDestino) {
      return res.status(404).json({ message: "Paquete destino no encontrado" });
    }

    res.json({ paqueteDestino });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST 

// Función para crear un nuevo registro en PaquetesDestinos
const crearPaqueteDestino = async (req, res) => {
  try {
    const { idpaquete, iddestino } = req.body;

    // Validación básica
    if (!idpaquete || !iddestino) {
      return res.status(400).json({ message: "idpaquete y iddestino son requeridos" });
    }

    // Verificar si el paquete y el destino existen
    const paquete = await PaquetesModel.findByPk(idpaquete);
    const destino = await DestinosModel.findByPk(iddestino);

    if (!paquete || !destino) {
      return res.status(404).json({ message: "Paquete o Destino no encontrado" });
    }

    // Crear el nuevo registro en PaquetesDestinos
    const nuevoPaqueteDestino = await PaquetesDestinosModel.create({
      idpaquete,
      iddestino,
    });

    res.status(201).json(nuevoPaqueteDestino);
    console.log("Nuevo paquete destino creado con éxito");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error al crear el paquete destino:", error);
  }
};


// DELETE 
const eliminarPaqueteDestino = async (req, res) => {
  try {
    const { id } = req.params;

    const paqueteDestino = await PaquetesDestinosModel.findByPk(id);

    if (!paqueteDestino) {
      return res.status(404).json({ message: "PaqueteDestino no encontrado" });
    }

    await paqueteDestino.destroy();
    res.status(200).json({ message: "PaqueteDestino eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error al eliminar el paquete destino:", error);
  }
};
// UPDATE 
const actualizarPaqueteDestino = async (req, res) => {
  try {
    const { id } = req.params;
    const { idpaquete, iddestino } = req.body;

    // Verificar que el paquete-destino existe
    const paqueteDestino = await PaquetesDestinosModel.findByPk(id);
    if (!paqueteDestino) {
      return res.status(404).json({ message: "PaqueteDestino no encontrado" });
    }

    // Verificar que el idpaquete existe
    if (idpaquete) {
      const paquete = await PaquetesModel.findByPk(idpaquete);
      if (!paquete) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      paqueteDestino.idpaquete = idpaquete;
    }

    // Verificar que el iddestino existe
    if (iddestino) {
      const destino = await DestinosModel.findByPk(iddestino);
      if (!destino) {
        return res.status(404).json({ message: "Destino no encontrado" });
      }
      paqueteDestino.iddestino = iddestino;
    }

    // Guardar los cambios
    await paqueteDestino.save();
    res.status(200).json(paqueteDestino);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error al actualizar el paquete destino:", error);
  }
};



module.exports= {traerPaquetesDestinos,traerunPaqueteDestino , traerunDestinoPaquete , crearPaqueteDestino , eliminarPaqueteDestino , actualizarPaqueteDestino}