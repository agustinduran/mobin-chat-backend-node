const { ROLES } = require('../../core/enums/roles-enums');
const rolesUtils = require('../../core/utils/roles-utils');

const verifyPermissionsActionOnOneChat = (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    // FIXME: Chat is alowed for that id?

    // He dont want to see their resource?
    // if (id != req.userId && rolesUtils.hasRole(req.userRol, ROLES.ADMIN) == false) {
        // return res.status(403).send({ success: false, message: 'No tiene el permiso solicitado para acceder al recurso' })
    // } else {
        next();
    // }
};

module.exports = { verifyPermissionsActionOnOneChat };