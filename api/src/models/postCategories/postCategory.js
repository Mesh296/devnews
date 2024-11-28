const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const postCategory = sequelize.define('postCategory', {})

    return postCategory
}