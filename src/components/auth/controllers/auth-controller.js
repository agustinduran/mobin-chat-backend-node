const client = require('../../../database/redis');

const authService     = require('../services/auth-service');
const usersService    = require('../../users/services/users-service');

const usersRepository = require('../../users/repositories/users-repository');

exports.login = async (req, res) => {
    const user = await usersService.getUserByUsername(usersRepository, req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const hasValidPassword = authService.hasValidPassword(req.body.password, user.password);
    if (hasValidPassword === false) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    if (user.active != 1) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);
    if (token) {
        return res.status(201).json({ success: true, token: `Bearer ${token}`, user: user });
    } else {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
};

exports.register = async (req, res) => {
    try {
        const newUser = await usersService.createUser(usersRepository, req.body);
        if (newUser) {
            // TODO: NO HARDCODE. MAKE A CONST CLASS
            client.del('/api/users/');
            return res.status(201).json({ success: true, user: newUser, from: "database" });
        } else return res.status(500).json({ success: false, user: {}, message: 'Error en el servidor' });
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError')
            return res.status(403).json({ success: false, message: 'Usuario ya existente' });
        else
            return res.status(500).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};