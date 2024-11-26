"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "UserFollow",
      [
        {
          userID: 1,
          courseID: 1,
        },
        {
          userID: 1,
          courseID: 3,
        },
        {
          userID: 1,
          courseID: 2,
        },
        {
          userID: 1,
          courseID: 5,
        },
        {
          userID: 1,
          courseID: 4,
        },
        {
          userID: 2,
          courseID: 1,
        },
        {
          userID: 2,
          courseID: 3,
        },
        {
          userID: 3,
          courseID: 1,
        },
        {
          userID: 3,
          courseID: 2,
        },
        {
          userID: 3,
          courseID: 3,
        },
        {
          userID: 3,
          courseID: 4,
        },
        {
          userID: 3,
          courseID: 5,
        },
        {
          userID: 4,
          courseID: 1,
        },
        {
          userID: 4,
          courseID: 2,
        },
        {
          userID: 4,
          courseID: 3,
        },
        {
          userID: 5,
          courseID: 1,
        },
        {
          userID: 5,
          courseID: 2,
        },
        {
          userID: 5,
          courseID: 3,
        },
        {
          userID: 5,
          courseID: 4,
        },
        {
          userID: 5,
          courseID: 5,
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

// npx sequelize-cli db:seed --seed seeder_user.js
