const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Vote = sequelize.define('vote', {
        voteType: {
            type: DataTypes.ENUM('up', 'down'),
            allowNull: false,
        }
    })
    return Vote;
}