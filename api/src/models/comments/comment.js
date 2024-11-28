const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Comment = sequelize.define("comment", {})
    return Comment;
}


