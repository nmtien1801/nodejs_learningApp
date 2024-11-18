"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          description: "Web development project on front-end technologies.",
          file: "front-end.zip",
          lessonID: 1,
        },
        {
          description: "Machine learning project using Python and TensorFlow.",
          file: "ml-project.zip",
          lessonID: 2,
        },
        {
          description: "Mobile app development project using React Native.",
          file: "mobile-app.zip",
          lessonID: 3,
        },
        {
          description: "Data analysis project with data visualization in R.",
          file: "data-analysis.zip",
          lessonID: 4,
        },
        {
          description:
            "IoT project with embedded systems and sensor data collection.",
          file: "iot-project.zip",
          lessonID: 5,
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
