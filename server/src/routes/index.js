const express = require('express')
const userRoutes = require('./users/user.js')
const categoryRoutes = require('./categories/category.js')
const postRoutes = require('./posts/post.js')
const savePostRoutes = require('./savePosts/savePost.js')
const voteRoutes = require('./votes/vote.js')
const commentRoutes = require('./comments/comment.js')
const postCategoryRoutes = require('./postsCategories/postCategory.js')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/posts', postRoutes)
router.use('/savePosts', savePostRoutes)
router.use('/votes', voteRoutes)
router.use('/comments', commentRoutes)
router.use('/postsCategories', postCategoryRoutes)

module.exports = router