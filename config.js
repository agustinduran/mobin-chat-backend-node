// Get the .env vars
require('dotenv').config();

const config = {
    PORT    : process.env.NODE_PORT || 3000,
    DB_PORT : process.env.DB_PORT   || 27017,
    DB_HOST : process.env.DB_HOST   || 0
};

module.exports = config;