const db = require("../data/bd.js");
const { DataTypes } = require("sequelize");
const PaquetesModel = require("./PaquetesModel");
const DestinosModel = require("./DestinosModel");

const PaquetesDestinosModel = db.define("paquetes_destinos", {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idpaquete: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PaquetesModel,
      key: "idpaquetes"
    }
  },
  iddestino: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DestinosModel,
      key: "iddestino"
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'createdAt' // Nombre exacto del campo en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'updatedAt' // Nombre exacto del campo en la base de datos
  }
}, {
  tableName: "paquetes_destinos",
  timestamps: true,
  underscored: true,
   freezeTableName: true,
  // Desactivar el manejo de ID automático por Sequelize
  // También puedes intentar establecer explícitamente que no hay un campo `id`
  // Esto puede ayudar a Sequelize a no asumir la existencia de un campo `id` en la tabla.
  // Esto varía según la versión de Sequelize y cómo interpreta los modelos.
  // Puedes probar diferentes combinaciones para ajustar esto según tu caso específico.
  defaultScope: {
    attributes: { exclude: ['id'] } // Excluye el campo `id` por defecto
  }
});

// Establecer asociaciones manualmente
PaquetesDestinosModel.belongsTo(PaquetesModel, { foreignKey: "idpaquete" });
PaquetesDestinosModel.belongsTo(DestinosModel, { foreignKey: "iddestino" });

module.exports = PaquetesDestinosModel;
