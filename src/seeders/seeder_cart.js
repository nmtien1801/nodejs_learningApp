"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Chèn dữ liệu mẫu vào bảng Carts
    await queryInterface.bulkInsert("Carts", [
      {
        userID: 1,
        courseID: 2,
      },
      {
        userID: 1,
        courseID: 3,
      },
      {
        userID: 2,
        courseID: 1,
      },
      {
        userID: 3,
        courseID: 2,
      },
      {
        userID: 2,
        courseID: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

// npx sequelize-cli db:seed --seed seeder_user.js
