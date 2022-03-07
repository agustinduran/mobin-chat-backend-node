const { Op } = require('sequelize');
const User = require('../models/user');

exports.getAll = async () => {
    // TODO: Paginate
    return await User.findAll({
        attributes: { exclude: ['password'] }
    });
};

exports.getById = async (id) => {
    return await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] }
    });
}

// TODO: Should be more than one with same name
exports.getByName = async (name) => {
    return await [];
}

exports.save = async (user) => {
    const newUser = await User.create({
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone
    });
    // Exclude password
    delete newUser.dataValues.password;
    return newUser;
}

exports.getByUsernameOrEmail = async (username) => {
    return await User.findOne({ 
        where: {[Op.or]: [{ username: username }, { email: username }] }
    });
}