'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột body với allowNull: true
    await queryInterface.addColumn('comments', 'body', {
      type: Sequelize.STRING,
      allowNull: true, // Cho phép NULL tạm thời
    });

    // Gán giá trị mặc định cho các bản ghi hiện tại
    await queryInterface.sequelize.query(`
      UPDATE comments
      SET body = 'Default comment body'
      WHERE body IS NULL
    `);

    // Thay đổi cột body để không cho phép NULL
    await queryInterface.changeColumn('comments', 'body', {
      type: Sequelize.STRING,
      allowNull: false, // Không cho phép NULL sau khi cập nhật
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'body');
  }
};