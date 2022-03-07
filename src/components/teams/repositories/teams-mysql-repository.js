const Team = require('../models/Team');

exports.getAll = async () => {
    // TODO: Paginate
    return await Team.findAll({ where: { active: 1 } });
};

exports.getById = async (id) => {
    return await Team.findOne({ where: { id: id } });
}

// TODO: Should be more than one with same name
exports.getByName = async (name) => {
    return await Team.findOne({ where: { nameShort: name } });
}

exports.save = async (team) => {
    return await Team.create({
        nameShort: team.nameShort,
        nameLong: team.nameLong,
        fundationAt: team.fundationAt
    });
}

exports.update = async (team) => {
    // return await Team.create({
    //     nameShort: team.nameShort,
    //     nameLong: team.nameLong,
    //     fundationAt: team.fundationAt
    // });
    return false;
}

exports.delete = async (team) => {
    // return await Team.create({
    //     nameShort: team.nameShort,
    //     nameLong: team.nameLong,
    //     fundationAt: team.fundationAt
    // });
    return false;
}