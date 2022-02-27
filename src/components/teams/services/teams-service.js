exports.getAll = async (repository) => {
    const teams = await repository.getAll();
    return teams;
};

exports.getTeamById = async (repository, id) => {
    const team = await repository.getById(id);
    return team;
};

exports.saveTeam = async (repository, team) => {
    // TODO: Validar que no exista dicho team. Validar si está repetido
    const teamExists = await repository.getByName(team.name);
    if (teamExists) {
        throw new Error(`Team ${team.name} already exists`);
    }

    const newTeam = await repository.save(team);
    return newTeam;
};