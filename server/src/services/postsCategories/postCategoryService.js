const { PostCategory, Category } = require('../../models')
const post = require('../../models/posts/post')
const postService = require('../posts/postService')

const createPostCategory = async(postId, categoryId) => {
    try {
        const post = await postService.getById(postId)
        if(!post) {
            throw new Error('Post does not exist')
        }
 
        const category = await Category.getById(categoryId)
        if(!category) {
            throw new Error('Post does not exist')
        }

        const postCategory = await PostCategory.create({
            postId: postId, 
            categoryId: categoryId
        })

        return postCategory

    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePostCategory = async(postCategoryId, userId) => {
    try {
        const postCategory = await PostCategory.findByPk(postCategoryId)
        if(!postCategory) {
            throw new Error('This connection not found')
        }

        // if (postCategory.userId !== userId) {
        //     throw new Error('You are not authorized to delete this post');
        // }

        await PostCategory.destroy({ where: {id: postCategoryId} })

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAll = async() => {
    try {
        const postCategory = await PostCategory.findAll()
        return postCategory
    } catch (error) {
        throw new Error(error.message)
    }
}

const getByPost = async(postId) => {
    try {
        const postsCategories = await PostCategory.findAll({
            where: {postId: postId}
        })
        return postsCategories
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { createPostCategory, deletePostCategory, getAll, getByPost }