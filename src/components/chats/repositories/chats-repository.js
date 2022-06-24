const { QueryTypes } = require('sequelize');
const db = require('../../../database/connection');
const Chat = require('../models/chat');

// TODO: Change to Sequelize practices
exports.save = async (chat) => {
    const sql = 'INSERT INTO chats(id_user_transmitter, id_user_receiver, timestamp) VALUES ($1, $2, $3)';
    return await db.query(sql, {
        bind: [chat['id-user-transmitter'], chat['id-user-receiver'], new Date().getTime()],
        type: QueryTypes.INSERT,
        plain: true,
        raw: true
    });
}

// TODO: Change to Sequelize practices
exports.getByBothUsers = async (chat) => {
    // TODO: Controlar que el chat pertenece a ese usuario
    const sql = 'SELECT * FROM chats WHERE (id_user_transmitter = $1 AND id_user_receiver = $2) OR (id_user_transmitter = $2 AND id_user_receiver = $1)';
    return await db.query(sql, {
        bind: [chat['id-user-transmitter'], chat['id-user-receiver']],
        type: QueryTypes.SELECT
    });
}

// TODO: Change to Sequelize practices
exports.update = async (chat) => {
    // TODO: Controlar que el chat pertenece a ese usuario
    const sql = 'UPDATE chats SET id_user_transmitter = $2, id_user_receiver = $3, timestamp = $4 WHERE id = $1';
    return await db.query(sql, {
        bind: [chat.id, chat.id_user_transmitter, chat.id_user_receiver, new Date().getTime()],
        type: QueryTypes.UPDATE
    });
}

/** Return all chats by user with other important data, for example: the last message between both users, etc */ 
// TODO: Change to Sequelize practices
exports.getAllByIdUser = async (idUser) => {
    // TODO: Controlar que el chat pertenece a ese usuario
    const sql = `
        SELECT
            c.id,
            c.id_user_transmitter,
            c.id_user_receiver,
            c.timestamp,
            u1.name AS name_user1,
            u1.surname AS surname_user1,
            u1.image AS image_user1,
            u2.name AS name_user2,
            u2.surname AS surname_user2,
            u2.image AS image_user2,
            (SELECT message FROM messages m WHERE m.id_chat = c.id ORDER BY m.timestamp DESC LIMIT 1) AS last_message,
            (SELECT timestamp FROM messages m WHERE m.id_chat = c.id ORDER BY m.timestamp DESC LIMIT 1) AS last_message_timestamp,
            (SELECT COUNT(*) FROM messages m WHERE m.id_chat = c.id AND (m.status = 'SENDED' OR m.status = 'RECEIVED') AND m.id_user_receiver = $1) AS unread_messages
        FROM chats c
        INNER JOIN users u2 ON (u2.id = c.id_user_transmitter)
        INNER JOIN users u1 ON (u1.id = c.id_user_receiver)
        WHERE (c.id_user_receiver = $1 OR c.id_user_transmitter = $1)
            AND (SELECT COUNT(*) FROM messages AS m WHERE m.id_chat = c.id) > 0`;
    return await db.query(sql, {
        bind: [idUser],
        type: QueryTypes.SELECT
    });
}