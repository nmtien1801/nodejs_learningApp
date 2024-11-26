"use strict";

const course = require("../models/course");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Lessons", // 25 data
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
        {
          title: "Introduction to JavaScript",
          courseID: 2,
        },
        {
          title: "Advanced JavaScript Concepts",
          courseID: 2,
        },
        {
          title: "React Basics",
          courseID: 2,
        },
        {
          title: "Node.js for Beginners",
          courseID: 2,
        },
        {
          title: "Web Development with HTML & CSS",
          courseID: 2,
        },
        {
          title: "Introduction to JavaScript",
          courseID: 3,
        },
        {
          title: "Advanced JavaScript Concepts",
          courseID: 3,
        },
        {
          title: "React Basics",
          courseID: 3,
        },
        {
          title: "Node.js for Beginners",
          courseID: 3,
        },
        {
          title: "Web Development with HTML & CSS",
          courseID: 3,
        },
        {
          title: "Introduction to JavaScript",
          courseID: 4,
        },
        {
          title: "Advanced JavaScript Concepts",
          courseID: 4,
        },
        {
          title: "React Basics",
          courseID: 4,
        },
        {
          title: "Node.js for Beginners",
          courseID: 4,
        },
        {
          title: "Web Development with HTML & CSS",
          courseID: 4,
        },
        {
          title: "Introduction to JavaScript",
          courseID: 5,
        },
        {
          title: "Advanced JavaScript Concepts",
          courseID: 5,
        },
        {
          title: "React Basics",
          courseID: 5,
        },
        {
          title: "Node.js for Beginners",
          courseID: 5,
        },
        {
          title: "Web Development with HTML & CSS",
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
