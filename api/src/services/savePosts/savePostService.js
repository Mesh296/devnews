const { SavedPost } = require('../../models')
const postService = require('../posts/postService')

const createSavePost = async(postId, userId) => {
    try {
        const post = await postService.getById(postId)
        if(!post) {
            throw new Error('Post does not exist')
        }

        const savedPost = await SavedPost.create({
            postId: postId, 
            userId: userId
        })

        return savedPost

    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteSavePost = async(savedPostId, userId) => {
    try {
        const savedPost = await SavedPost.findByPk(savedPostId)
        if(!savedPost) {
            throw new Error('This content not found')
        }

        if (savedPost.userId !== userId) {
            throw new Error('You are not authorized to delete this post');
        }

        await SavedPost.destroy({ where: {id: savedPostId} })

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAll = async() => {
    try {
        const savedPosts = await SavedPost.findAll()
        return savedPosts
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllByUser = async(userId) => {
    try {
        const savedPost = await SavedPost.findOne({
            where: {userId: userId}
        })
        return savedPost
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createSavePost, deleteSavePost, getAll, getAllByUser }