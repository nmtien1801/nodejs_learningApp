"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects", //10 data
      [
        {
          userID: 1,
          name: "Web Development Project",
          description: "Web development project on front-end technologies.",
        },
        {
          userID: 1,
          name: "Machine Learning Project",
          description: "Machine learning project using Python and TensorFlow.",
        },
        {
          userID: 1,
          name: "Mobile App Development Project",
          description: "Mobile app development project using React Native.",
        },
        {
          userID: 1,
          name: "Data Analysis Project",
          description: "Data analysis project with data visualization in R.",
        },
        {
          userID: 1,
          name: "IoT Project",
          description:
            "IoT project with embedded systems and sensor data collection.",
        },
        {
          userID: 3,
          name: "Web Development Project",
          description: "Web development project on front-end technologies.",
        },
        {
          userID: 4,
          name: "Machine Learning Project",
          description: "Machine learning project using Python and TensorFlow.",
        },
        {
          userID: 5,
          name: "Mobile App Development Project",
          description: "Mobile app development project using React Native.",
        },
        {
          userID: 3,
          name: "Data Analysis Project",
          description: "Data analysis project with data visualization in R.",
        },
        {
          userID: 4,
          name: "IoT Project",
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
