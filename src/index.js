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

// catch 404 and forward to error handler
const { error404, errorCatcher } = require('./core/middlewares/error-handler');
app.use(error404);
app.use(errorCatcher);

app.listen(config.server.port, () => {
    console.log(`listening on port ${config.server.port}`);
});

