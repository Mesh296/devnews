const { Comment, User } = require('../../models');


const createComment = async(data) => {
    try {
        const newComment = await Comment.create(data);
        console.log (newComment.id)
        const responseComment = getCommentById(newComment.id) 
        return responseComment;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCommentById = async(commentId) => {
    try {
        const comment = await Comment.findOne({
            where: { id: commentId },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'id', 'fullName'],
                },
            ],
        });
        if (!comment) {
            throw new Error('Comment does not exist')
        }
        return comment
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllCommentsOfPost = async(postId) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: postId },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'id'],
                },
            ],
        })
        return comments
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateComment = async(userId, commentId, body) => {
    try {
        const existingComment = await getCommentById(commentId)
        if (!existingComment) {
            throw new Error(`Comment with ID ${commentId} not found`)
        }
        if (existingComment.userId !== userId) {
            throw new Error('You are not authorized to update this comment');
        }

        const [updated] = await Comment.update({body}, {
            where: {id: commentId}
        })
        if (!updated) {
            throw new Error(`Failed to update comment with ID ${commentId}`)
        }
        const updatedComment = await getCommentById(commentId)
        return updatedComment
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteComment = async (commentId, userId) => {
    try {
        const existingComment = await getCommentById(commentId)
        if (!existingComment) {
            throw new Error(`Comment with ID ${commentId} not found`)
        }

        if (existingComment.userId !== userId) {
            throw new Error('You are not authorized to delete this comment');
        }

        await Comment.destroy({ where: { id: commentId } })

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createComment, getAllCommentsOfPost, getCommentById, updateComment, deleteComment }