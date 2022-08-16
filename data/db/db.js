const knex = require("knex");
const config = require("../../knexfile");
const currentEnvironment = process.env.NODE_ENV || "development";
const db = knex(config[currentEnvironment]);

module.exports = db;
