const authService    = require('../services/auth-service');
const authRepository = require('../repositories/auth-mysql-repository');

exports.login = async (req, res) => {
    console.log(req.body.username);
    const token = await authService.validateCredentials(authRepository, req.body.username, req.body.password);
    if (token) {
        return res.status(200).json({ success: true, token: token});
    } else {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
};

exports.register = async (req, res) => {
    // const {name, fundation_date} = req.body;

    // // TODO: Middleware
    // if (!name || !fundation_date) {
    //     res.status(404).json({ msg: "Todos los campos son obligatorios" });
    // }

    // const newTeam = {
    //     name,
    //     fundation_date
    // };

    // const team = await teamsService.saveTeam(teamsRepository, newTeam);

    // res.status(201).json(team);
};