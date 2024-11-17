'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "teacher@gmail.com",
          password: "$2a$10$zHwMBVyL3Cbwq8hfEFryJeVaUW45Dxs.KuLUKWf9DAMtTJzp3m5vK", // 1234
          userName: "MinhTien",
          title: "UX/UI Designer",
        },
        {
          email: "user@gmail.com",
          password: "$2a$10$zHwMBVyL3Cbwq8hfEFryJeVaUW45Dxs.KuLUKWf9DAMtTJzp3m5vK", // 1234
          userName: "ThuyNhi",
          title: "Front-end Developer",
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
  }
};

// npx sequelize-cli db:seed --seed seeder_user.js