const teamsService    = require('../services/teams-service');
const teamsRepository = require('../repositories/teams-mysql-repository');

exports.getAll = async (req, res) => {
    const teams = await teamsService.getAll(teamsRepository);
    res.status(200).json(teams);
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    // TODO: Middleware
    if (isNaN(id)) {

    }

    const team = await teamsService.getTeamById(teamsRepository, id);

    if (team == false) {
        res.status(404).json({ msg: "Equipo no existente" });
    }
};

exports.save = async (req, res) => {
    const {name, fundation_date} = req.body;

    // TODO: Middleware
    if (!name || !fundation_date) {
        res.status(404).json({ msg: "Todos los campos son obligatorios" });
    }

    const newTeam = {
        name,
        fundation_date
    };

    const team = await teamsService.saveTeam(teamsRepository, newTeam);

    res.status(201).json(team);
};