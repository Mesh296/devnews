'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('posts', ['title'], {
      name: 'idx_posts_title' 
    });

    await queryInterface.addIndex('users', ['username'], {
      name: 'idx_users_username'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('posts', 'idx_posts_title'); 
    await queryInterface.removeIndex('users', 'idx_users_username');
  }
};
