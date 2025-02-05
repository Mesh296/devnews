const sequelize = require('../../providers/db.js')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            index: true,
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
    }, {
        indexes: [
            {
              name: 'idx_full_text_search',
              fields: ['title', 'description'],
              using: 'GIN',  // Use PostgreSQL's GIN index for full-text search
            },
          ]
    });

    return Post;
};

