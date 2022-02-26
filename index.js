// ENVIROMENT VARS
require('dotenv').config();

// SERVER
const Server = require('./models/server');

const server = new Server();
server.listen();