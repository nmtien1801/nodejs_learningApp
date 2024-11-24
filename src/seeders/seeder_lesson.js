"use strict";

const course = require("../models/course");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Lessons",
      [
        {
          title: "Introduction to JavaScript",
          
          courseID: 1,
        },
        {
          title: "Advanced JavaScript Concepts",
          courseID: 1,
        },
        {
          title: "React Basics",
          courseID: 1,
        },
        {
          title: "Node.js for Beginners",
          courseID: 1,
        },
        {
          title: "Web Development with HTML & CSS",
          courseID: 1,
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
