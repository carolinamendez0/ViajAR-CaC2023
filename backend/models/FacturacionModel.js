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
    primaryKey: true,
    allowNull: false
    },
    id_paquete: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
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
