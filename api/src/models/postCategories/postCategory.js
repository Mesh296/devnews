const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const postCategory = sequelize.define('postCategory', {
        datePostCategory: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })

    return postCategory
}