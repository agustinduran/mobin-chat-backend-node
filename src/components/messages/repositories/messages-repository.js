const { QueryTypes } = require('sequelize');
const db = require('../../../database/connection');
const Message = require('../models/message');

exports.getAllByChat = async (idChat) => {
    // TODO: Project.findAndCountAll for getCount
    return await Message.findAll({
        // TODO: attributes: { exclude: ['password'] },
        where: { "id_chat": idChat },
        order: [["timestamp", "DESC"]]
    });
};

// TODO: Change to Sequelize practices
exports.save = async (message) => {
    const sql = 'INSERT INTO messages(message, id_user_sender, id_user_receiver, id_chat, status, url, is_image, is_video, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    return await db.query(sql, {
        bind: [
            message.message,
            message['id-user-sender'],
            message['id-user-receiver'],
            message['id-chat'],
            "SENDED",
            // message.url,
            "",
            message['is-image'],
            message['is-video'],
            new Date().getTime()
        ], type: QueryTypes.INSERT
    });
}

// TODO: Change to Sequelize practices
exports.updateStatusToSeen = async (id) => {
    // TODO: Controlar que el chat pertenece a ese usuario
    const sql = 'UPDATE messages SET status = $2 WHERE id = $1';
    return await db.query(sql, {
        bind: [id, 'SEEN'],
        type: QueryTypes.UPDATE
    });
}