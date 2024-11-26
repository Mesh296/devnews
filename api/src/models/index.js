const sequelize = require('../providers/db.js');

// Import models
const initCategory = require('./categories/category');
const initComment = require('./comments/comment');
const initPostCategory = require('./postCategories/postCategory');
const initPost = require('./posts/post');
const initSavedPost = require('./savedPosts/savePost');
const initUser = require('./users/user');
const initVote = require('./votes/vote');

// Initialize models
const Category = initCategory(sequelize);
const Comment = initComment(sequelize);
const PostCategory = initPostCategory(sequelize);
const Post = initPost(sequelize);
const SavedPost = initSavedPost(sequelize);
const User = initUser(sequelize);
const Vote = initVote(sequelize);

// Define associations
Category.hasMany(PostCategory, { foreignKey: 'categoryId', as: 'postCategories' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

PostCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category' });
PostCategory.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Vote, { foreignKey: 'postId', as: 'votes' });
Post.hasMany(SavedPost, { foreignKey: 'postId', as: 'savedPosts' });
Post.hasMany(PostCategory, { foreignKey: 'postId', as: 'postCategories' });

SavedPost.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
SavedPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
User.hasMany(Vote, { foreignKey: 'userId', as: 'votes' });
User.hasMany(SavedPost, { foreignKey: 'userId', as: 'savedPosts' });

Vote.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Vote.belongsTo(User, { foreignKey: 'userId', as: 'user' });


// Export models
module.exports = { 
    sequelize, 
    Category, 
    Comment, 
    PostCategory, 
    Post, 
    SavedPost, 
    User, 
    Vote 
};