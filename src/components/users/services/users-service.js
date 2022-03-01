const authUtils = require('../../auth/utils/auth-utils');

exports.getAll = async (repository) => {
    const users = await repository.getAll();
    return users;
};

exports.getUserById = async (repository, id) => {
    const user = await repository.getById(id);
    return user;
};

exports.createUser = async (repository, user) => {
    user.password = authUtils.encriptPassword(user.password);
    const newUser = await repository.save(user);
    return newUser;
};

exports.getUserByUsername = async (repository, username) => {
    const user = await repository.getByUsernameOrEmail(username);
    return user;
};