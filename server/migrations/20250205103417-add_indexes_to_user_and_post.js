'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex('users', ['id'], {
      name: 'idx_user_id'
    })
    await queryInterface.addIndex('posts', ['id'], {
      name: 'idx_post_id'
    })
    await queryInterface.addIndex('posts', ['title', 'description'], {
      name: 'idx_full_text_search',
      using: 'GIN',  // PostgreSQL's GIN index for full-text search
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeIndex('users', 'idx_user_id');
    await queryInterface.removeIndex('posts', 'idx_post_id');
    await queryInterface.removeIndex('posts', 'idx_full_text_search');
  }
};
