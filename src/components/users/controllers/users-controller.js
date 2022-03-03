const usersService    = require('../services/users-service');
const usersRepository = require('../repositories/users-mysql-repository');

exports.getAll = async (req, res) => {
    const users = await usersService.getAll(usersRepository);
    res.status(200).json({ success: true, users: users });
};

exports.getById = async (req, res) => {
    const id = Number.parseInt(req.params.id);

    // He want to see their resource?
    if (id != req.userId) {
        // TODO: NEED ROLE ADMIN. Controlar rol, si no lo tiene echarlo al pingo
    }

    const userFinded = await usersService.getUserById(usersRepository, id);
    console.log(userFinded);
    if (userFinded) {
        return res.status(200).json({ success: true, user: userFinded });
    } else {
        return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
    }
};
