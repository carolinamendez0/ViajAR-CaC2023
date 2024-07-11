const PaquetesModel = require ("../models/PaquetesModel.js")
const { Op } = require('sequelize');
const DestinosModel = require('../models/DestinosModel');
const PaquetesDestinosModel = require('../models/PaquetesDestinosModel');
const sequelize = require ('sequelize')

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
        // const destinos = await DestinosModel.findOne({ where: { iddestino: `${paquetes.id_destinos}` } }) // metodo de sequelize
        res.json({paquetes})
    } catch (error) {
        res.json({message: error.message})
   }
}

const actualizarPaquete= async (req,res)=>{
    try {
        const paqueteExist = await PaquetesModel.findOne({ where: { idpaquetes: req.params.id } });
        if (!paqueteExist) {
            return res.status(404).json({ message: "Paquete no encontrado" });
        }
      console.log(req.body);
      // Consulta con Op.ne (Operador not equal):
         // Si se está intentando cambiar el título del paquete
        if (req.body.titulo_paquete) {
            // Verificar si el nuevo título ya existe en otro paquete
            const paqueteConMismoTitulo = await PaquetesModel.findOne({
                where: {
                    titulo_paquete: req.body.titulo_paquete,
                    idpaquetes: { [Op.ne]: paqueteExist.idpaquetes } // Excluir el paquete actual
                }
            });
            // Si se encuentra un paquete con el mismo título, devolver un error 409 (Conflict)
          if (paqueteConMismoTitulo) {
              console.log('titulo existente')
                return res.status(409).json({ message: "El título ya existe en la base de datos" });
            }
        }
        // Actualizar el paquete con los nuevos datos
        await paqueteExist.update(req.body);
        res.json({"message": "Registro actualizado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


  const crearPaquete= async (req,res)=>{
    try {
    // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    const { titulo_paquete, descripcion_paquete,img_paquete, precio_paquete, dias_paquete } = req.body;
    const nuevoPaquete = await PaquetesModel.create({
        titulo_paquete,
        descripcion_paquete,
        img_paquete,
        precio_paquete,
        dias_paquete,
    });
    console.log(nuevoPaquete)
       return res.status(201).json({ message: "Paquete creado exitosamente", paquete: nuevoPaquete });
    } catch (error) {
      //  console.error("Error en la solicitud:", error.message);
      console.log(error)
        return res.status(500).json({ message: "Error en el servidor al crear Paquete" });
    }
}

const borrarPaquete= async (req,res)=>{
      try {
          const paquete = await PaquetesModel.destroy({ where: { idpaquetes: req.params.id } })
          console.log('paq')
          console.log(paquete)
        res.json({"message": "Paquete Borrado correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}


const obtenerPaquetesPorRegion = async (req, res) => {
  try {
    const { region } = req.params;
    // Paso 1: Obtener los destinos por región
    const destinos = await DestinosModel.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('region_destino')),
        'LIKE',
        `%${region.toLowerCase()}%`
      )
    });

    if (!destinos.length) {
      return res.status(404).json({ message: "No se encontraron destinos para esta región." });
    }

    // const destinoIds = destinos.map(destino => destino.iddestino);
    // const descripcion_destino = destinos.map(destino => destino.descripcion_destino);
    const destinoIds = destinos.map(destino => destino.iddestino);
    const destinoMap = destinos.reduce((acc, destino) => {
      acc[destino.iddestino] = destino.titulo_destino;
      return acc;
    }, {});

    console.log(destinoMap)

    // Paso 2: Obtener los paquetes_destinos por ids de destino
    const paquetesDestinos = await PaquetesDestinosModel.findAll({
      where: { iddestino: destinoIds }
    });

    if (!paquetesDestinos.length) {
      return res.status(404).json({ message: "No se encontraron paquetes para estos destinos." });
    }

    const paqueteIds = paquetesDestinos.map(paqueteDestino => paqueteDestino.idpaquete);
    // Paso 3: Obtener los paquetes por ids de paquete
    const paquetes = await PaquetesModel.findAll({
      where: { idpaquetes: paqueteIds }
    });

    if (!paquetes.length) {
      return res.status(404).json({ message: "No se encontraron paquetes." });
    }

    // Combinar los paquetes con sus descripciones de destino
    const paquetesConDescripcion = paquetes.map(paquete => {
      const paqueteDestino = paquetesDestinos.find(pd => pd.idpaquete === paquete.idpaquetes);
      return {
        ...paquete.dataValues,
        titulo_destino: destinoMap[paqueteDestino.iddestino]
      };
    });

    res.json({paquetesConDescripcion});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { traerPaquetes, traerunPaquete, actualizarPaquete ,crearPaquete,borrarPaquete , obtenerPaquetesPorRegion}