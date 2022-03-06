const cacheService    = require('../../core/services/cache-services');
const usersService    = require('../services/users-service');
const usersRepository = require('../repositories/users-mysql-repository');

exports.getAll = async (req, res) => {
    const users = await usersService.getAll(usersRepository);
    // TODO: PAGINATE
    await cacheService.setCache(req.originalUrl, { success: true, users: users }, 60);
    res.status(200).json({ success: true, users: users });
};

exports.getById = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const userFinded = await usersService.getUserById(usersRepository, id);

    if (userFinded) {
        await cacheService.setCache(req.originalUrl, { success: true, user: userFinded }, 60);
        return res.status(200).json({ success: true, user: userFinded });
    } else {
        return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
    }
};
