const usersRepository = require('../../users/repositories/users-mysql-repository');

// const usernameOrEmailNotExists = async (username = '') => {
//     const user = await usersRepository.getByUsernameOrEmail(username);
//     if (user == false) {
//         throw new Error("Credenciales inválidas");
//     }
// };

const usernameExists = async (username = '') => {
    const user = await usersRepository.getByUsernameOrEmail(username);
    if (user) {
        throw new Error("Usuario ya registrado");
    }

    return true;
};

const emailExists = async (email = '') => {
    const user = await usersRepository.getByUsernameOrEmail(email);
    if (user) {
        throw new Error("Email ya registrado");
    }

    return true;
};

const correctSamePasswords = (value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Las contraseñas no son iguales');
    }

    return true;
};

module.exports = { usernameExists, emailExists, correctSamePasswords };