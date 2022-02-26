exports.getAll = async (repository) => {
    const teams = await repository.getAll();
    return teams;
};

exports.getTeamById = async (repository, id) => {
    const team = await repository.getById(id);
    return team;
};