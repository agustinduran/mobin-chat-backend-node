const authService     = require('../services/auth-service');
const authRepository  = require('../repositories/auth-mysql-repository');

const usersRepository = require('../../users/repositories/users-mysql-repository');
const usersService    = require('../../users/services/users-service');

exports.login = async (req, res) => {
    const token = await authService.validateCredentials(authRepository, req.body.username, req.body.password);
    if (token) {
        return res.status(201).json({ success: true, token: token});
    } else {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
};

exports.register = async (req, res) => {
    try {
        // TODO: DONT SAVE SAME EMAIL OR USERNAME
        const newUser = await usersService.saveUser(usersRepository, req.body);
        if (newUser) return res.status(201).json({ success: true, user: newUser });
        else return res.status(500).json({ success: false, user: {}, message: 'Error en el servidor' });
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError')
            return res.status(403).json({ success: false, message: 'Usuario ya existente' });
        else
            return res.status(500).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};