const db = require ("../data/bd.js")

const {DataTypes} = require ("sequelize")

const DestinosModel = db.define ("destinos",{
 iddestino: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  provincia: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  pais: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion_destino: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  region_destino: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  titulo_destino: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  img_destino: {
    type: DataTypes.STRING(255),
    allowNull: true
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
  tableName: 'destinos',
  timestamps: true,
  underscored: true
});

module.exports = DestinosModel