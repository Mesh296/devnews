const express = require('express')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();
const voteService = require('../../services/votes/voteService.js')

router.post('/vote', authentication, async(req, res) => {
    try {
        const data = req.body;
        console.log(data.voteType)
        const userId = req.user.id;
        const vote = await voteService.createVote(userId, data.postId, data.voteType)
        return res.status(201).json(vote)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/get-user-vote/:postId', authentication, async(req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const result = await voteService.getUserVote(postId, userId)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/unvote/:postId', authentication, async(req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const unvote = await voteService.deleteVote(postId, userId)
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