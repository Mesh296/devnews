const { User } = require('../models')
const { Sequelize } = require('sequelize');

async function register(userData) {
    try {
        if (!userData.email || !userData.password) {
            throw new Error('Email and password are require');
        }

        const existingUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ email: userData.email }, { username: userData.username }]
            }
        });
        if (existingUser) {
            throw new Error('User already existed');
        }
        const user = await User.create(userData);
        return user
    } catch (error) {
        throw new Error(error.message || 'An error occurred while registering the user');
    }
}

async function getAll() {
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { register, getAll };