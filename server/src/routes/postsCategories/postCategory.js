const express = require('express')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();
const postCategoryService = require('../../services/postsCategories/postCategoryService.js')

router.get('/all', async(req, res) => {
    try {
        const postCategory = await postCategoryService.getAll();
        return res.status(201).json(postCategory)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})


router.post('/create', authentication, async(req,res) => {
    try {
        const categoryId = req.body.categoryId
        const postId = req.body.postId
        const postCategory = await postCategoryService.createPostCategory(postId, categoryId) 
        return res.status(201).json(postCategory)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', async(req,res) => {
    try {
        const postCategoryId = req.params.id
        //const userId = req.user.id; 
        const postCategory = await postCategoryService.deletePostCategory(postCategoryId)

        return res.status(201).json("Remove category successfully!")
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router