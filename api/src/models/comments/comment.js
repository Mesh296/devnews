const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Comment = sequelize.define("comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    })
    return Comment;
}


