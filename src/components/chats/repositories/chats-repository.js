const { QueryTypes } = require('sequelize');
const db = require('../../../database/connection');
const Chat = require('../models/chat');

// exports.getAll = async () => {
//     // TODO: Paginate
//     return await User.findAll({
//         attributes: { exclude: ['password'] }
//     });
// };

// exports.getById = async (id) => {
//     return await User.findOne({
//         where: { id: id },
//         attributes: { exclude: ['password'] }
//     });
// }

// TODO: Change to Sequelize practices
exports.save = async (chat) => {
    const sql = 'INSERT INTO chats(id_user_transmitter, id_user_receiver, timestamp) VALUES ($1, $2, $3)';
    return await db.query(sql, {
        bind: [chat['id-user-transmitter'], chat['id-user-receiver'], new Date().getTime()],
        type: QueryTypes.INSERT
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
        bind: [chat.id, chat['id-user-transmitter'], chat['id-user-receiver'], new Date().getTime()],
        type: QueryTypes.UPDATE
    });
}