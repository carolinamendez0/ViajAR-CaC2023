const express = require('express');
const router = express.Router();
require('dotenv').config();

const FacturacionModel = require("../models/FacturacionModel.js")
const PaquetesModel = require ("../models/PaquetesModel.js")
const UsuariosModel = require("../models/UserModel.js")
router.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON


 const traerFacturacion= async (req,res)=>{
    try {
        const facturacion = await FacturacionModel.findAll() //  metodo de sequelize
        if ( facturacion.length === 0) {
    return res.status(404).json({ message: 'No hay Facturaciones cargadas' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json( facturacion );     
    } catch (error) {
        res.json({message:error.message}) 
    }
}

const traerUnaFacturacion = async (req, res) => {
    try {
      const facturacion = await FacturacionModel.findAll({ where: { id_usuario: req.params.id } }) //  metodo de sequelize
      console.log(facturacion);
        if ( facturacion.length === 0) {
    return res.status(404).json({ message: 'No hay Facturaciones cargadas' }); // Aquí respondemos con un mensaje de error y un código 404
  }
  res.json( facturacion );     
    } catch (error) {
        res.json({message:error.message}) 
    }
}

  const crearUnaFacturacion= async (req,res)=>{
    try {
      const { idUsuario, idPaquete } = req.body;
      console.log(req.body)
    
    // Validación básica
    if (!idUsuario || !idPaquete) {
      return res.status(400).json({ message: "idUsuario y idPaquete son requeridos" });
    }
    
    // Verificar si el paquete y el destino existen
    const usuario = await UsuariosModel.findByPk(idUsuario);
    const paquete = await PaquetesModel.findByPk(idPaquete);

    if (!paquete || !usuario) {
      return res.status(404).json({ message: "Paquete o Destino no encontrado" });
    }
    // Crear el nuevo registro en facturacion
    const nuevaFacturacion = await FacturacionModel.create({
      id_usuario: idUsuario,
      id_paquete: idPaquete
    });

    console.log(nuevaFacturacion)
       return res.status(201).json({ message: "Facturacion creado exitosamente", comentario: nuevaFacturacion });
    } catch (error) {
         console.error("Error en la solicitud:", error.message);
        return res.status(500).json({ message: "Error en el servidor al crear facturacion" });
    }
}

  const borrarFacturacion= async (req,res)=>{
    try {
        const facturacion = await  FacturacionModel.destroy({where :{idfacturacion:req.params.id}})
        res.json({"message": "facturación Borrada correctamente"}) 
    } catch (error) {
        res.json({message:error.message}) 
    }
}

module.exports = {crearUnaFacturacion, traerFacturacion,traerUnaFacturacion, borrarFacturacion}
