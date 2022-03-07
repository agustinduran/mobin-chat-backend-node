const { Model, DataTypes} = require('sequelize');
const sequelize = require('../../../database/connection')

class Team extends Model {}
Team.init({
    nameShort : { field: 'name_short', type: DataTypes.STRING, allowNull: false },
    nameLong : { field: 'name_long', type: DataTypes.STRING, allowNull: true },
    fundationAt: { field: 'fundation_at', type: DataTypes.DATE, allowNull: false },
    active   : { type: DataTypes.TINYINT, allowNull: true, default: 1 },
    createdAt: { field: 'created_at', type: DataTypes.DATE, allowNull: true },
    updatedAt: { field: 'updated_at', type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    modelName: 'teams'
});

module.exports = Team;