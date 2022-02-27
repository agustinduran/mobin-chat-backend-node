const { config } = require('../../../config');
var jwt = require('jsonwebtoken');

const hasValidAuthorization = (req, res, next) => {
    try {
        // Split its for ignore the 'Bearer'
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, config.keys.jwt);
        // Save in the req for have a global state
        req.userId = decoded.id;
        return next();
    } catch (err) {
        res.status(403).json({ success: false, message: 'No tiene permiso solicitado para acceder al recurso' });
    }
};

module.exports = hasValidAuthorization;