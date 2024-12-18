const sequelize = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        postDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
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

