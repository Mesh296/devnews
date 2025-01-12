const express = require('express')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();
const savePostService = require('../../services/savePosts/savePostService.js')

router.get('/all', async(req, res) => {
    try {
        const savedPosts = await savePostService.getAll();
        return res.status(201).json(savedPosts)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/me/all', authentication, async(req, res) => {
    try {
        const userId = req.user.id;
        const savedPosts = await savePostService.getAllByUser(userId)
        return res.status(201).json(savedPosts)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/create', authentication, async(req,res) => {
    try {
        const userId = req.user.id;
        const postId = req.body.postId
        const savedPost = await savePostService.createSavePost(postId, userId) 
        return res.status(201).json(savedPost)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', authentication, async(req,res) => {
    try {
        const savedPostId = req.params.id
        const userId = req.user.id; 
        const savedPost = await savePostService.deleteSavePost(savedPostId, userId)

        return res.status(201).json("Post has been unsaved!")
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router