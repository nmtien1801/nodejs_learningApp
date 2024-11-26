"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Orders", //8 data
      [
        {
          userID: 1,
          total: 27, //$27
        },
        {
          userID: 2,
          total: 260, //$260
        },
        {
          userID: 2,
          total: 260, //$260
        },
        {
          userID: 3,
          total: 270, //$270
        },
        {
          userID: 2,
          total: 260, //$260
        },
        {
          userID: 3,
          total: 260, //$260
        },
        {
          userID: 4,
          total: 260, //$260
        },
        {
          userID: 5,
          total: 280, //$280
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
