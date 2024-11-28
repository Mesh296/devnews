const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return RefreshToken;
}