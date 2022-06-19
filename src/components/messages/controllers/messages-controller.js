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
        return res.status(200).json({ success: true, messages, from: "database" });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ success: false, message: 'Error en el servidor, intente nuevamente más tarde' });
    }
};

exports.getAll = async (req, res) => {
//     const id = Number.parseInt(req.params.id);
//     const chatFinded = await messagesService.getChatById(messagesRepository, id);

//     if (chatFinded) {
//         try {
//             client.set(req.originalUrl, JSON.stringify({ success: true, chat: chatFinded, from: "cache" }));
//         } catch (err) {
//             console.log(err);
//         } finally {
//             return res.status(200).json({ success: true, chat: chatFinded, from: "database" });
//         }
//     } else {
//         return res.status(404).send({ success: false, message: 'El recurso solicitado no existe o fue eliminado' })
//     }
    return res.status(200).json({ success: false, from: "in-process" });
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
