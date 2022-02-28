const { config } = require('../config');
const { Sequelize } = require('sequelize');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mariadb',
    logging: true
});

module.exports = db;