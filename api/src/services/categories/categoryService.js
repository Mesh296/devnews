const { Category } = require('../../models')
const { Sequelize } = require('sequelize')

const getAll = async() => {
    try {
        const categories = Category.findAll()
        return categories
    } catch (error) {
        throw new Error(error.message)
    }
}

const createCategory = async(data) => {
    try {
        const existingCategory = await Category.findOne({
            where: {name: data.name}
        })
        if (existingCategory) {
            throw new Error('This category already existed')
        }
        const category = await Category.create(data)
        return category
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteCategory = async(categoryId) => {
    try {
        const existingCategory = await Category.findOne({
            where: {id: categoryId}
        })
        if (!existingCategory) {
            throw new Error('This Category does not exist')
        }
        await Category.destroy({where: {id: categoryId}})
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { getAll, createCategory, deleteCategory }