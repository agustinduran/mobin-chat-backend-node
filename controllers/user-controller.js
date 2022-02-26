const express = require('express');
const router = express.Router();

const idParamIsInteger      = require('../middlewares/id-param-is-integer');
const hasRoleAdmin          = require('../middlewares/has-role');
const hasValidAuthorization = require('../middlewares/has-valid-authorization');

const users = require('../models/user');

router.get('/', hasRoleAdmin, (req, res) => {
    return res.status(200).json(users);
});

router.get('/:id', idParamIsInteger, hasValidAuthorization, (req, res) => {
    const id = Number.parseInt(req.params.id);

    // He want to see their resource?
    const authorizationUserId = Number.parseInt(req.headers['authorization']);
    const userConnected = users.find((u) => u.id === authorizationUserId);

    if (userConnected.id === id || userConnected.role === 'ROLE_ADMIN') {
        userFinded = users.find((u) => u.id === id);
        return res.status(200).json(userFinded);
    } else {
        return res.status(403).json({ message: 'No tiene permiso solicitado para acceder al recurso' });
    }
});

module.exports = router;