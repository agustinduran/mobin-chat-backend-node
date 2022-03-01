const { Op } = require('sequelize');
const User = require('../models/user');

exports.getAll = async () => {
    return await [];
};

exports.getById = async (id) => {
    return await  [];
}

exports.getByName = async (name) => {
    return await [];
}

exports.save = async (user) => {
    return await User.create({
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone
    });
}

exports.getByUsernameOrEmail = async (username) => {
    return await User.findOne({ 
        where: {[Op.or]: [{ username: username }, { email: username }] }
    });
}