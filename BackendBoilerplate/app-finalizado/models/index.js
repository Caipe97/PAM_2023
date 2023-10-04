const Sequelize = require("sequelize");

// Configuración de SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Esta config es si usamos otra bd que no sea SQLite
//const sequelize = new Sequelize('database', 'username', 'password', {
//  host: 'localhost',
//  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notas = require("./nota.model.js")(sequelize, Sequelize);

module.exports = db;
