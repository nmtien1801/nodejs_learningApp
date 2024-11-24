"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          userID: 1,
          name: "Web Development Project",
          description: "Web development project on front-end technologies.",
        },
        {
          userID: 1,
          name: "Web Development Project",
          description: "Machine learning project using Python and TensorFlow.",
        },
        {
          userID: 1,
          name: "Web Development Project",
          description: "Mobile app development project using React Native.",
        },
        {
          userID: 1,
          name: "Web Development Project",
          description: "Data analysis project with data visualization in R.",
        },
        {
          userID: 1,
          name: "Web Development Project",
          description:
            "IoT project with embedded systems and sensor data collection.",
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
