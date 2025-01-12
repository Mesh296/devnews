const { Post } = require('../../models');
const { Op, Sequelize } = require("sequelize");

const createPost = async (data) => {
    try {
        const post = await Post.create(data);
        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

const searchPost = async (data) => {
    try {
        const formattedQuery = data.replace(/\s+/g, '&');
        const posts = await Post.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.match]: Sequelize.fn('to_tsquery', formattedQuery) } },
                    { description: { [Op.match]: Sequelize.fn('to_tsquery', formattedQuery) } },
                ]
            }
        })
        return posts;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getById = async (postId) => {
    try {
        const post = await Post.findByPk(postId)
        if (!post) {
            throw new Error('Post not found')
        }
        return post
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAll = async () => {
    try {
        const posts = await Post.findAll();
        return posts

    } catch (error) {
        throw new Error(error.message)
    }
}

const updatePost = async (data, postId, userId) => {
    try {
        const existingPost = await Post.getById(postId)
        if (!existingPost) {
            throw new Error(`Post with ID ${postId} not found`)
        }

        if (existingPost.userId !== userId) {
            throw new Error('You are not authorized to update this post');
        }

        const [updated] = await Post.update(data, { where: { id: postId } })

        if (!updated) {
            throw new Error(`Failed to update post with ID ${postId}`)
        }

        const updatedPost = await Post.findByPk(postId);
        return updatedPost

    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePost = async (postId, userId) => {
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found')
        }

        if (post.userId !== userId) {
            throw new Error('You are not authorized to delete this post');
        }

        await Post.destroy({ where: { id: postId } })

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createPost, updatePost, deletePost, getById, getAll, searchPost }