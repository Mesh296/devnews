const express = require('express');
const categoryService = require('../../services/categories/categoryService.js')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();

router.get('/all', async(req, res) => {
    try {
        const categories = await categoryService.getAll()
        return res.status(201).send(categories.map(category => category.toJSON()))
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/create', authentication, async(req, res) => {
    try {
        const data = req.body
        const category = await categoryService.createCategory(data)
        return res.status(201).json(category)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', authentication, async(req, res) => {
    try {
        const data = req.params.id
        const deleteCategory = await categoryService.deleteCategory(data)
        return res.status(201).json('Category has been deleted successfully!')
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router