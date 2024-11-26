const { sequelize } = require('../../providers/db.js')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        fullName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Username must be unique"
            },
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'other'),
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Email must be unique"
            },
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 128],
                    msg: "Password must be between 6 and 128 characters",
                }
            },
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash);
            },
            
        }
    });
    return User;
}

