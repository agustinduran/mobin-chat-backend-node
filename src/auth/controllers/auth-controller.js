const authService    = require('../services/auth-service');
const authRepository = require('../repositories/auth-mysql-repository');

exports.login = async (req, res) => {
    const token = await authService.validateCredentials(authRepository, req.body.username, req.body.password);
    if (token) {
        return res.status(200).json({ success: true, token: token});
    } else {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
};

exports.register = async (req, res) => {
    const {username, password, email} = req.body;

    const newUser = {
        username,
        password,
        email
    };

    // const user = await userService.saveUser(teamsRepository, newTeam);

    // res.status(201).json(team);
};