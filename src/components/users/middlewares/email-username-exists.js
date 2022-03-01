const usersRepository = require('../../users/repositories/users-mysql-repository');

const usernameOrEmailExists = async (username = '') => {
    const user = await usersRepository.getByUsernameOrEmail(username);
    if (user) {
        if (user.username === username ) {
            throw new Error("Usuario ya registrado");
        } else {
            throw new Error("Email ya registrado");
        }
    }
};

const usernameExists = async (username = '') => {
    const user = await usersRepository.getByUsernameOrEmail(username);
    if (user) {
        throw new Error("Usuario ya registrado");
    }
};

const emailExists = async (email = '') => {
    const user = await usersRepository.getByUsernameOrEmail(email);
    if (user) {
        throw new Error("Email ya registrado");
    }
};

module.exports = { usernameOrEmailExists, usernameExists, emailExists };