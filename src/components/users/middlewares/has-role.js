const hasRoleAdmin = (req, res, next) => {
    const authorizationUserId = Number.parseInt(req.headers['authorization']);
    const user = users.find((u) => u.id === authorizationUserId);

    if (user && user.role === 'ROLE_ADMIN') {
        next();
    } else {
        res.status(403).json({ message: 'No tiene permiso solicitado para acceder al recurso' });
    }
};

module.exports = hasRoleAdmin;