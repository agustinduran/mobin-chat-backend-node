const { config } = require('./config');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Mobin',
            description: 'Backend',
            version: config.version,
            contact: {
                name: config.author
            },
            servers: [`http://${config.server.host}:${config.server.port}1`]
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'authorization',
                scheme: 'bearer',
                in: 'header',
            }
        },
        security: [ { bearerAuth: [] } ],
    },
    apis: ['./src/components/*/routes/*-routes.js']
};

const express = require('express');
const app = express();
app.use(express.json());

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
const coreRoutes = require('./components/core/routes/core-routes');
app.use('/api', coreRoutes);

// AUTH
const authRoutes = require('./components/auth/routes/auth-routes');
app.use('/api/auth', authRoutes);

// USERS
const usersRoutes = require('./components/users/routes/users-routes');
app.use('/api/users', usersRoutes);

// CHATS
const chatsRoutes = require('./components/chats/routes/chats-routes');
app.use('/api/chats', chatsRoutes);

// MESSAGES
const messagesRoutes = require('./components/messages/routes/messages-routes');
app.use('/api/messages', messagesRoutes);

// catch 404 and forward to error handler
const { error404, errorCatcher } = require('./components/core/middlewares/error-handler');
app.use(error404);
app.use(errorCatcher);

server.listen(config.server.port, () => {
    console.log(`listening on port ${config.server.port}`);
});

// SOCKETS
const chatSocket = require("./socket/chat-socket");
chatSocket(io);

module.exports = { app, server };