const db = require ("../data/bd.js")

const {DataTypes} = require ("sequelize")

const DestinosModel = db.define ("destinos",{
    iddestino: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  titulo_destino: {
    type: DataTypes.STRING(45),
    allowNull: false,
    collate: 'utf8mb3_bin'
  },
  descripcion_destino: {
    type: DataTypes.STRING(350),
    allowNull: true,
    defaultValue: null,
    charset: 'utf8mb3'
  },
  region_destino: {
    type: DataTypes.STRING(45),
    allowNull: false,
    charset: 'utf8mb3'
  },
    ciudad: {
    type: DataTypes.STRING(45),
    allowNull: false,
    charset: 'utf8mb3'
  },
  provincia: {
    type: DataTypes.STRING(45),
    allowNull: false,
    charset: 'utf8mb3'
  },
    pais: {
    type: DataTypes.STRING(45),
    allowNull: false,
    charset: 'utf8mb3'
  },
  img_destino: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null,
    charset: 'utf8mb3'
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
}, {
  tableName: 'destinos',
  timestamps: true, // Esto gestionará automáticamente los campos createdAt y updatedAt
  underscored: true // Si tus nombres de columnas tienen guiones bajos, esto ayudará a que sequelize los maneje correctamente
});

module.exports = DestinosModel