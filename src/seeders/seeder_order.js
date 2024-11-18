"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          userID: 1, // người mua khóa học
          total: 27, //$27
        },
        {
          userID: 2, // người mua khóa học
          total: 260, //$260
        },
        {
          userID: 2, // người mua khóa học
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
