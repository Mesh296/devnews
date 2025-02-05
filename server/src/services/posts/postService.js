const { Post, sequelize, PostCategory, Category, User, Vote, Comment } = require('../../models');
const { Op, Sequelize } = require("sequelize");
const postCategoryService = require('../postsCategories/postCategoryService.js')
const voteService = require('../votes/voteService.js')

const createPost = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const post = await Post.create(data, { transaction });

        const existingCategories = await data.categories.map(categoryId => (
            Category.findAll({
                where: { id: categoryId },
                transaction
            })
        ))
        if (existingCategories.length !== data.categories.length) {
            throw new Error('Some categories not found');
        }

        const postCategories = data.categories.map(categoryId => ({
            postId: post.id,
            categoryId
        }))

        await PostCategory.bulkCreate(postCategories, { transaction })

        await transaction.commit();

        const fullPost = await Post.findByPk(post.id, {
            include: [{
                model: Category,
                through: { attributes: [] }, // Ẩn thông tin bảng trung gian
                as: 'categories',
                attributes: ['id', 'name'] // Chỉ lấy id và name của category
            }]
        });

        return fullPost;

    } catch (error) {
        await transaction.rollback();
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
            },
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Ẩn thông tin bảng trung gian
                    as: 'categories', // Chỉ định alias đã định nghĩa
                    attributes: ['id', 'name'], // Chỉ lấy id và name của category
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['body', 'createdAt']
                },

            ],
        });

        const fullPost = await Promise.all(
            posts.map(async (post) => {
                const voteSummary = await voteService.countVoteOfPost(post.id)
                return {
                    ...post.toJSON(),
                    voteSummary,
                }
            })
        )

        return fullPost;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getById = async (postId) => {
    try {
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Ẩn thông tin bảng trung gian
                    as: 'categories', // Chỉ định alias đã định nghĩa
                    attributes: ['id', 'name'], // Chỉ lấy id và name của category
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['body', 'createdAt']
                },

            ],
        });

        if(!post) {
            throw new Error("Can not find post")
        }

        const voteSummary = await voteService.countVoteOfPost(postId)
        return {
            ...post.toJSON(),
            voteSummary,
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

const getByUser = async (userId) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Ẩn thông tin bảng trung gian
                    as: 'categories', // Chỉ định alias đã định nghĩa
                    attributes: ['id', 'name'], // Chỉ lấy id và name của category
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['body', 'createdAt']
                },

            ],
            
        })
        const fullPost = await Promise.all(
            posts.map(async (post) => {
                const voteSummary = await voteService.countVoteOfPost(post.id)
                return {
                    ...post.toJSON(),
                    voteSummary,
                }
            })
        )

        return fullPost;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAll = async () => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Ẩn thông tin bảng trung gian
                    as: 'categories', // Chỉ định alias đã định nghĩa
                    attributes: ['id', 'name'], // Chỉ lấy id và name của category
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['body', 'createdAt']
                },

            ],
        });

        const fullPost = await Promise.all(
            posts.map(async (post) => {
                const voteSummary = await voteService.countVoteOfPost(post.id)
                return {
                    ...post.toJSON(),
                    voteSummary,
                }
            })
        )

        return fullPost;

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

        const postsCategories = await postCategoryService.getByPost(postId)

        await Promise.all(
            postsCategories.map((postCategory) =>
                postCategoryService.deletePostCategory(postCategory.id)
            )
        );

        await Post.destroy({ where: { id: postId } })

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createPost, updatePost, deletePost, getById, getByUser, getAll, searchPost }