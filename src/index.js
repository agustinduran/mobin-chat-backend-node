const express = require('express');
const { config } = require('./config');
const app = express();
app.use(express.json());
// TODO: Agregar helmet

// CORE
app.get('/', (req, res) => {
    res.send('Hello World');
});

// AUTH
const authRoutes = require('./auth/routes/auth-routes');
app.use('/auth', authRoutes);

// TEAMS
const teamsRoutes = require('./teams/routes/teams-routes');
app.use('/equipos', teamsRoutes);

const errorHandler = require('./error-handler');
// Middleware global
app.use(errorHandler);

app.listen(config.server.port, () => {
    console.log(`listening on port ${config.server.port}`);
});

// SERVER
// const Server = require('./src/core/models/server');

// const server = new Server();
// server.listen();

