"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          userID: 1,
          description: "Web development project on front-end technologies.",
          file: "front-end.zip",
          resource: "đây là file txt 1",
          lessonID: 1,
        },
        {
          userID: 1,
          description: "Machine learning project using Python and TensorFlow.",
          file: "ml-project.zip",
          resource: "đây là file txt 5",
          lessonID: 2,
        },
        {
          userID: 1,
          description: "Mobile app development project using React Native.",
          file: "mobile-app.zip",
          resource: "đây là file txt 2",
          lessonID: 3,
        },
        {
          userID: 1,
          description: "Data analysis project with data visualization in R.",
          file: "data-analysis.zip",
          resource: "đây là file txt 3",
          lessonID: 4,
        },
        {
          userID: 1,
          description:
            "IoT project with embedded systems and sensor data collection.",
          file: "iot-project.zip",
          resource: "đây là file txt 4",
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
