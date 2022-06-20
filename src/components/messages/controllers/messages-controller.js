const client  = require('../../../database/redis');

const messagesService    = require('../services/messages-service');
const messagesRepository = require('../repositories/messages-repository');

exports.getAllMessagesByChat = async (req, res) => {
    // TODO: PAGINATE
    const idChat = Number.parseInt(req.params.id);
    try {
        const messages = await messagesService.getAllByChat(messagesRepository, idChat);
        //     // TODO: Use expiration
        //     client.set(req.originalUrl, JSON.stringify({ success: true, messages, from: "cache" }));
        return res.status(200).json({ success: true, data: messages, from: "database" });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};

exports.create = async (req, res) => {
    try {
        const newMessage = await messagesService.createMessage(messagesRepository, req.body);
        console.log(newMessage);
        if (newMessage) {
            return res.status(201).json({ success: true, data: newMessage, from: "database" });
        } else return res.status(500).json({ success: false, data: {}, message: 'Error en el servidor' });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};
