"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          userID: 1, // người mua khóa học
          courseID: 1, // khóa học mua
          total: 27, //$27
        },
        {
          userID: 2, // người mua khóa học
          courseID: 1, // khóa học mua
          total: 260, //$260
        },
        {
          userID: 2, // người mua khóa học
          courseID: 2, // khóa học mua
          total: 260, //$260
        },
      ],
      {}
    );
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

// npx sequelize-cli db:seed --seed seeder_order.js
