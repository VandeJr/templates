import { DataTypes, Sequelize } from 'sequelize'
import { databasePath } from './config.js'

const sequelize = new Sequelize(`sqlite::///${databasePath}`)

const Type = sequelize.define('Type', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), nullable: false },
  description: { type: DataTypes.STRING, nullable: true },
  backEnd: { type: DataTypes.STRING(50), nullable: true },
  frontEnd: { type: DataTypes.STRING(50), nullable: true },
  database: { type: DataTypes.STRING(50), nullable: true }
})

const Column = sequelize.define('Column', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), nullable: false },
  description: { type: DataTypes.STRING, nullable: true },
  nullable: { type: DataTypes.BOOLEAN, nullable: false },
  isPK: { type: DataTypes.BOOLEAN, nullable: false },
  isAI: { type: DataTypes.BOOLEAN, nullable: false } // is AutoIncrement
})

const Relation = sequelize.define('Relation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  relationship: { type: DataTypes.ENUM('OneToOne', 'OneToMany', 'ManyToOne', 'ManyToMany'), nullable: false }
})

const Entity = sequelize.define('Entity', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), nullable: false },
  description: { type: DataTypes.STRING, nullable: true }
})

const Application = sequelize.define('Application', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), nullable: false },
  description: { type: DataTypes.STRING, nullable: true },
  backEnd: { type: DataTypes.STRING(50), nullable: true },
  frontEnd: { type: DataTypes.STRING(50), nullable: true },
  database: { type: DataTypes.STRING(50), nullable: true }
})

Column.belongsTo(Type)
Column.belongsTo(Entity)
Entity.hasMany(Column, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Entity.belongsToMany(Relation, { through: 'EntityRelations', onDelete: 'CASCADE' })
Relation.belongsToMany(Entity, { through: 'EntityRelations' })
Application.hasMany(Entity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Application.hasMany(Relation, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export {
  sequelize, Type, Column, Entity, Relation, Application
}
