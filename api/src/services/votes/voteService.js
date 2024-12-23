const { Sequelize } = require('sequelize');
const { Vote } = require('../../models');

const countVoteOfPost = async (postId) => {
    try {
        // Count the number of upvotes and downvotes
        const voteCounts = await Vote.findAll({
            where: { postId },
            attributes: [
                'voteType',
                [Sequelize.fn('COUNT', Sequelize.col('voteType')), 'count']
            ],
            group: ['voteType'], // Group by voteType (e.g., upvote or downvote)
        });

        // Transform the result into an object with counts for upvotes and downvotes
        const voteSummary = {
            upvotes: 0,
            downvotes: 0,
        };

        voteCounts.forEach((vote) => {
            if (vote.voteType === 'up') {
                voteSummary.upvotes = parseInt(vote.dataValues.count, 10);
            } else if (vote.voteType === 'down') {
                voteSummary.downvotes = parseInt(vote.dataValues.count, 10);
            }
        });

        return voteSummary;
    } catch (error) {
        throw new Error(`Failed to count votes for post with ID ${postId}: ${error.message}`);
    }
};


const createVote = async(userId, postId, voteType) => {
    try {
        const existingVote = await Vote.findOne({
            where: {
                postId: postId,
                userId: userId
            }
        })
        if (existingVote) {
            throw new Error('You already vote this post')
        }
        const vote = await Vote.create({
            userId: userId,
            postId: postId,
            voteType: voteType
        })
        return vote
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateVote = async(userId, postId, voteType)  => {
    try {
        const existingVote = await Vote.findOne({
            where: {
                postId: postId,
                userId: userId
            }
        })
        if (!existingVote) {
            const vote = await Vote.create({
                userId: userId,
                postId: postId,
                voteType: voteType
            })
            return vote
        }

        const [updated] = await Vote.update({voteType}, { 
            where: {
                postId: postId,
                userId: userId
            }
        })
        if (!updated) {
            throw new Error(`Failed to update post with ID ${postId}`)
        }
        const updatedVote =  await Vote.findOne({
            where: {
                postId: postId,
                userId: userId
            }
        })
        return updatedVote
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteVote = async(voteId, userId) => {
    try {
        const existingVote = await Vote.findByPk(voteId)
        if (!existingVote) {
            throw new Error('You have not vote this post yet')
        }
        if(existingVote.userId != userId) {
            throw new Error('You are not authorized to unvote this post');
        }
        await Vote.destroy({ where: { id: voteId } })
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createVote, deleteVote, updateVote, countVoteOfPost }