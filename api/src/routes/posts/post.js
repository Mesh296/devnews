const express = require('express')
const postService = require('../../services/posts/postService.js')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();

router.get('/post/:id', async(req, res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getById(postId);
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/all', async(req, res) => {
    try {
        const posts = await postService.getAll();
        return res.status(201).json(posts);
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/create', authentication, async(req, res) => {
    try {
        const data = req.body
        data.userId = req.user.id;
        const post = await postService.createPost(data)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.put('/update/:id', authentication, async(req, res) => {
    try {
        const data = req.body
        const postId = req.params.id
        const userId = req.user.id;
        const updatedPost = await postService.updatePost(data, postId, userId)
        return res.status(201).json(updatedPost)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', authentication, async(req, res) => {
    try {
        const postId = req.params.id
        const userId = req.user.id;
        const post = await postService.deletePost(postId, userId)
        return res.status(201).json("Post has been deleted succesfully!")
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router