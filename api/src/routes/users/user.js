const express = require('express');
const userService = require('../../services/userService.js')
var router = express.Router();

router.get('/', async(req, res) => {
    res.json("User Router");
})
router.get('/all', async(req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(201).send(users.map(user => user.toJSON()))
    } catch (error) {
        return res.status(400).send(e.errors.map(err => err.message))
    }
})

router.post('/register', async(req, res) => {
    try {
        const userData = req.body;
        const result = await userService.register(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message || 'Error registering user'
        });
    }
})



module.exports = router