const express = require('express');
const { config } = require('./config');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const db = require('./database/connection');
(async () => {
    try {
        await db.authenticate();
    } catch (error) {
        throw new Error(error);
    }
})();

// CORE
app.get('/', (req, res) => {
    res.send('Hello World');
});

// AUTH
const authRoutes = require('./components/auth/routes/auth-routes');
app.use('/auth', authRoutes);

// USERS
const usersRoutes = require('./components/users/routes/users-routes');
app.use('/users', usersRoutes);

// TEAMS
const teamsRoutes = require('./components/teams/routes/teams-routes');
app.use('/teams', teamsRoutes);

// catch 404 and forward to error handler
const { error404, errorCatcher } = require('./components/core/middlewares/error-handler');
app.use(error404);
app.use(errorCatcher);

app.listen(config.server.port, () => {
    console.log(`listening on port ${config.server.port}`);
});

