const client  = require('../../../database/redis');

const usersService    = require('../services/users-service');

const usersRepository = require('../repositories/users-repository');

exports.getAll = async (req, res) => {
    // TODO: PAGINATE
    const users = await usersService.getAll(usersRepository);
    try {
        // TODO: Use expiration
        client.set(req.originalUrl, JSON.stringify({ success: true, users, from: "cache" }));
    } catch (err) {
        console.log(err);
    } finally {
        res.status(200).json({ success: true, users, from: "database" });
    }
};

exports.getById = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const userFinded = await usersService.getUserById(usersRepository, id);

    if (userFinded) {
        try {
            client.set(req.originalUrl, JSON.stringify({ success: true, user: userFinded, from: "cache" }));
        } catch (err) {
            console.log(err);
        } finally {
            return res.status(200).json({ success: true, user: userFinded, from: "database" });
        }
    } else {
        return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
    }
};

exports.editById = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const userFinded = await usersService.getUserById(usersRepository, id);
    // TODO: Edit action
    if (userFinded) {
        try {
            client.set(req.originalUrl, JSON.stringify({ success: true, user: userFinded, from: "cache" }));
        } catch (err) {
            console.log(err);
        } finally {
            return res.status(200).json({ success: true, user: userFinded, from: "database" });
        }
    } else {
        return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
    }
};
