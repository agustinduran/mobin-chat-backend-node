const { QueryTypes } = require('sequelize');
const db = require('../../../database/connection');
const User = require('../models/chat');

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