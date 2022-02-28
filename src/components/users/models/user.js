const { Model, DataTypes} = require('sequelize');
const sequelize = require('../../../database/connection')

class User extends Model {}
User.init({
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: true},
    surname: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, allowNull: true, default: '[]'},
    active: {type: DataTypes.TINYINT, allowNull: true, default: 1},
    createdAt: {field: 'created_at', type: DataTypes.DATE, allowNull: true },
    updatedAt: {field: 'updated_at', type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    modelName: 'users'
});

module.exports = User;