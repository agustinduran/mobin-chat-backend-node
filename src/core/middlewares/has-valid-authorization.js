const users  = require('../models/user');

const hasValidAuthorization = (req, res, next) => {
    const authorizationUserId = Number.parseInt(req.headers['authorization']);
    const user = users.find((u) => u.id === authorizationUserId);

    if (user) {
        next();
    } else {
        res.status(403).json({ message: 'No tiene permiso solicitado para acceder al recurso' });
    }  
};

module.exports = hasValidAuthorization;