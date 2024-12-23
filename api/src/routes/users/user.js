const express = require('express');
const userService = require('../../services/users/userService.js')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();

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

router.get('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getById(userId);
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})


router.post('/register', async(req, res) => {
    try {
        const userData = req.body;
        const result = await userService.register(userData);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message || 'Error registering user'
        });
    }
})

router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body;
        const result = await userService.login(username, password);
        return res.status(201).json(result)
    } catch (error) {
        return res.status(403).json({
            message: error.message || 'Error logining user'
        });
    }
})

router.get('/me', authentication, async(req, res) => {
    try {
        const result = await userService.getById(req.user.id)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(403).json({
            message: error.message || 'User not found'
        });
    }
})

router.put('/update/:id', authentication, async(req, res) => {
    try {
        const userId = req.params.id;
        const loggedInUserId = req.user.id;
        console.log(userId)
        console.log(loggedInUserId)
        if (userId != loggedInUserId) {
            throw new Error('Please login to right account');
        }

        const userData = req.body;
        const result = await userService.updateUser(userData, userId);
        console.log(result)
        return res.status(201).json("Your information has been updated successfully!");
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
})

router.delete('/delete/:id', authentication, async(req, res) => {
    try {
        const userId = req.params.id;
        const loggedInUserId = req.user.id;
        if (userId != loggedInUserId) {
            throw new Error('Please login to right account');
        }
        const result = await userService.deleteUser(userId);
        res.status(201).json("User has been deleted successfully!");
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
})

module.exports = router