"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles", //2 data
      [
        {
          name: "Giáo viên",
          url: "/teacher/",
        },
        {
          name: "Học Sinh",
          url: "/user/",
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
