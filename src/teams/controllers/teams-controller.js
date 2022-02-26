const teamsService    = require('../services/teams-service');
const teamsRepository = require('../repositories/teams-mysql-repository');

exports.getAll = async (req, res) => {
    console.log("get all teams");
    const teams = await teamsService.getAll(teamsRepository);
    req.status(200).json(teams);
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    // TODO: Middleware
    if (isNaN(id)) {

    }

    const team = await teamsService.getTeamById(teamRepository, id);

    if (team == false) {
        res.status(404).json({ msg: "Equipo no existente" });
    }
};