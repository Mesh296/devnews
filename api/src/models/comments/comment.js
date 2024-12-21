const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Comment;
}


