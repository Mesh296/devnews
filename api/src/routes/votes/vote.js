const express = require('express')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();
const voteService = require('../../services/votes/voteService.js')

router.post('/vote', authentication, async(req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const vote = await voteService.createVote(userId, data.postId, data.voteType)
        return res.status(201).json(vote)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/unvote/:id', authentication, async(req, res) => {
    try {
        const voteId = req.params.id;
        const userId = req.user.id;
        const unvote = await voteService.deleteVote(voteId, userId)
        return res.status(201).json("Unvote succesfully!")
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.put('/update', authentication, async(req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const vote = await voteService.updateVote(userId, data.postId, data.voteType)
        return res.status(201).json(vote)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/vote-count/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const voteCount = await voteService.countVoteOfPost(postId);
        return res.status(200).json(voteCount);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router