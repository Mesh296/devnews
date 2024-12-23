const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Vote = sequelize.define('vote', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        voteType: {
            type: DataTypes.ENUM('up', 'down'),
            allowNull: false,
        }
    })
    return Vote;
}