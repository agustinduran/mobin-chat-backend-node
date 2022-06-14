const client  = require('../../../database/redis');

const chatsService    = require('../services/chats-service');

const chatsRepository = require('../repositories/chats-repository');

exports.getAll = async (req, res) => {
    // TODO: PAGINATE
    const chats = await chatsService.getAll(chatsRepository);
    try {
        // TODO: Use expiration
        client.set(req.originalUrl, JSON.stringify({ success: true, chats, from: "cache" }));
    } catch (err) {
        console.log(err);
    } finally {
        res.status(200).json({ success: true, chats, from: "database" });
    }
};

exports.getById = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const chatFinded = await chatsService.getChatById(chatsRepository, id);

    if (chatFinded) {
        try {
            client.set(req.originalUrl, JSON.stringify({ success: true, chat: chatFinded, from: "cache" }));
        } catch (err) {
            console.log(err);
        } finally {
            return res.status(200).json({ success: true, chat: chatFinded, from: "database" });
        }
    } else {
        return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
    }
};

exports.create = async (req, res) => {
    try {
        const newChat = await chatsService.createChat(chatsRepository, req.body);
        if (newChat) {
            return res.status(201).json({ success: true, data: newChat, from: "database" });
        } else return res.status(500).json({ success: false, data: {}, message: 'Error en el servidor' });
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError')
            return res.status(403).json({ success: false, message: 'Chat ya existente' });
        else
            return res.status(500).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};
