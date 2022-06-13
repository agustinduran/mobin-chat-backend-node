const { Model, DataTypes, literal } = require('sequelize');
const sequelize = require('../../../database/connection')
const User = require('../../users/models/user');

class Chat extends Model {}
Chat.init({
    timestamp: { field: 'timestamp', type: 'TIMESTAMP', defaultValue: literal('CURRENT_TIMESTAMP'), allowNull: false },
    createdAt: { field: 'created_at', type: DataTypes.DATE, allowNull: true },
    updatedAt: { field: 'updated_at', type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    modelName: 'chats'
});

Chat.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'id_user_transmitter'
});

Chat.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'id_user_receiver'
});

module.exports = Chat;