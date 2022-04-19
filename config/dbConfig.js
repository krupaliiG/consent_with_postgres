const { Sequelize } = require("sequelize");

const connection = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

export default db;
