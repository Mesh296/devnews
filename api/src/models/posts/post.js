const sequelize = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    args: true,
                    msg: "Must be a valid URL"
                }
            }
        }
    });

    return Post;
}

