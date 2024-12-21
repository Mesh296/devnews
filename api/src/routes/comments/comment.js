const express = require('express')
const authentication = require('../../middlewares/authentication.js')
const router = express.Router();
const commentService = require('../../services/comments/commentService.js')

// Create a new comment
router.post('/create', authentication, async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.user.id; // Assign the user ID from the authenticated user
        const comment = await commentService.createComment(data);
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Get a comment by ID
router.get('/:id', authentication, async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await commentService.getCommentById(commentId);
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Get all comments for a specific post
router.get('/all-comments/:postId', authentication, async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await commentService.getAllCommentsOfPost(postId);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Update a comment
router.put('/update/:commentId', authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const body = req.body.body; // Extract the new body of the comment
        const userId = req.user.id; // The user making the request
        const updatedComment = await commentService.updateComment(userId, commentId, body);
        return res.status(200).json(updatedComment);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Delete a comment
router.delete('/delete/:id', authentication, async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id; // The user making the request
        await commentService.deleteComment(commentId, userId);
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;