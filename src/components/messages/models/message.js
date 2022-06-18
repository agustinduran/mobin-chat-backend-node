const { Model, DataTypes, literal } = require('sequelize');
const sequelize = require('../../../database/connection')
const User = require('../../users/models/user');
const Chat = require('../../chats/models/chat');

class Message extends Model {}
Message.init({
    message  : { field: 'message', type: DataTypes.TEXT, allowNull: false },
    url      : { field: 'url', type: DataTypes.STRING, allowNull: false },
    isImage  : { field: 'is_image', type: DataTypes.BOOLEAN, defaultValue: false },
    isVideo  : { field: 'is_video', type: DataTypes.BOOLEAN, defaultValue: false },
    status   : { field: 'status', type: DataTypes.STRING, allowNull: false },
    timestamp: { field: 'timestamp', type: 'TIMESTAMP', defaultValue: literal('CURRENT_TIMESTAMP'), allowNull: false },
    createdAt: { field: 'created_at', type: DataTypes.DATE, allowNull: true },
    updatedAt: { field: 'updated_at', type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    modelName: 'messages'
});

Message.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'id_user_sender'
});

Message.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'id_user_receiver'
});

Message.belongsTo(Chat, {
    onDelete: 'cascade',
    foreignKey: 'id_chat'
});

module.exports = Message;