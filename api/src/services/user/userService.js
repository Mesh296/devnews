const { User } = require('../../models')
const { Sequelize } = require('sequelize');
const checkPassword = require('../../../utils/checkPassword')
const { Secret, JwtPayLoad } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')
const RefreshTokenService = require('../auth/refreshTokenService')

if (!process.env.SECRET_KEY) {
    throw new Error('Missing SECRET_KEY in environment variables');
}
const SECRET_KEY = process.env.SECRET_KEY;

const register = async(userData) => {
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

const login = async(username, password) => {
    try {
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ username: username }]
            }
        })

        if (!user || !checkPassword(user, password)) {
            throw new Error('User does not exist')
        }
        const refreshToken = await RefreshTokenService.generateRefreshToken(user)
        const token = jwt.sign({id: user.id?.toString()}, SECRET_KEY, {expiresIn: '2 days'})
        return { refreshToken: refreshToken, token: token}
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAll = async() => {
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        throw new Error(error.message);
    }
}

const getById = async(userId) => {
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async(userData, userId) => {
    try {
        await getById(userId);
        const updatedUser = await User.update(userData, {
            where: {id: userId}
        })
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }   
}

const deleteUser = async(userId) => {
    try {
        await User.destroy({where: {id: userId}})
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { register, getAll, login, getById, updateUser, deleteUser };