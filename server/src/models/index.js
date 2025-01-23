const sequelize = require('../providers/db.js');

// Import models
const initCategory = require('./categories/category.js');
const initComment = require('./comments/comment.js');
const initPostCategory = require('./postCategories/postCategory.js');
const initPost = require('./posts/post.js');
const initSavedPost = require('./savedPosts/savePost.js');
const initUser = require('./users/user.js');
const initVote = require('./votes/vote.js');
const initRefreshToken = require('./auth/refreshToken.js')

// Initialize models
const Category = initCategory(sequelize);
const Comment = initComment(sequelize);
const PostCategory = initPostCategory(sequelize);
const Post = initPost(sequelize);
const SavedPost = initSavedPost(sequelize);
const User = initUser(sequelize);
const Vote = initVote(sequelize);
const RefreshToken = initRefreshToken(sequelize)

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
User.hasOne(RefreshToken, { foreignKey: 'userId', as: 'refreshToken' });

Vote.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Vote.belongsTo(User, { foreignKey: 'userId', as: 'user' });

RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.belongsToMany(Post, {
    through: PostCategory,
    foreignKey: 'categoryId',
    as: 'posts',
});

Post.belongsToMany(Category, {
    through: PostCategory,
    foreignKey: 'postId',
    as: 'categories',
});


// Export models
module.exports = { 
    sequelize, 
    Category, 
    Comment, 
    PostCategory, 
    Post, 
    SavedPost, 
    User, 
    Vote,
    RefreshToken, 
};
