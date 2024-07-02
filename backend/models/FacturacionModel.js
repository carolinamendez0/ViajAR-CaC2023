const db = require ("../data/bd.js")
const { DataTypes } = require("sequelize")


const FacturacionModel = db.define ("facturacion",{
  idfacturacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nombre de la tabla a la que hace referencia
      key: 'idusuario' // Campo en la tabla usuarios
    }
  },
  id_paquete: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'paquetes', // Nombre de la tabla a la que hace referencia
      key: 'idpaquetes' // Campo en la tabla paquete
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'createdAt' // Esta opción indica a Sequelize que use 'created_at' en lugar de 'createdAt'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'updatedAt' // Esta opción indica a Sequelize que use 'updated_at' en lugar de 'updatedAt'
  }
});

module.exports = FacturacionModel
