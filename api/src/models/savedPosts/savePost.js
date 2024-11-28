const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const savedPost = sequelize.define('savePost', {})
    return savedPost;
}