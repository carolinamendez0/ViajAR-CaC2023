const express = require('express');
const router = express.Router();
require('dotenv').config();

const FacturacionModel = require("../models/FacturacionModel.js")
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
      // Asignar valor por defecto a superUsu si no está presente en el cuerpo de la solicitud
    // const { nombre, apellido, mail, comentario } = req.body;
    // const nuevoFacturacion = await FacturacionModel.create({
    //   nombre,
    //   apellido,
    //   mail,
    //   comentario
    // });
    // console.log(nuevoFacturacion)
    //    return res.status(201).json({ message: "Facturacion creado exitosamente", comentario: nuevoFacturacion });
    } catch (error) {
         console.error("Error en la solicitud:", error.message);
        return res.status(500).json({ message: "Error en el servidor al crear usuario" });
    }
}

module.exports = {crearUnaFacturacion, traerFacturacion,traerUnaFacturacion}
