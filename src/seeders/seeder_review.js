"use strict";

const review = require("../models/review");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Reviews", //8 data
      [
        {
          userID: 1,
          courseID: 1,
          review: "Great course, very informative and easy to follow!",
          rating: 4,
          time: "2024-11-17 10:30:00",
        },
        {
          userID: 1,
          courseID: 1,
          review: "I learned a lot, the pace was just right for beginners.",
          rating: 4,
          createdAt: "2024-11-17 10:30:00",
        },
        {
          userID: 3,
          courseID: 2,
          review:
            "The course was excellent, but I wish it had more advanced content.",
          rating: 4,
          createdAt: "2024-11-17 11:00:00",
        },
        {
          userID: 2,
          courseID: 2,
          review: "Well structured, but I expected more practical examples.",
          rating: 3,
          createdAt: "2024-11-17 11:30:00",
        },
        {
          userID: 3,
          courseID: 3,
          review:
            "Good introduction to Data Science. Some sections felt a bit rushed.",
          rating: 4,
          createdAt: "2024-11-17 12:00:00",
        },
        {
          userID: 3,
          courseID: 3,
          review: "Interesting content but needed more real-world examples.",
          rating: 3,
          createdAt: "2024-11-17 12:30:00",
        },
        {
          userID: 4,
          courseID: 4,
          review:
            "The UI/UX principles were well explained, but the examples could be better.",
          rating: 3,
          createdAt: "2024-11-17 13:00:00",
        },
        {
          userID: 5,
          courseID: 5,
          review:
            "Amazing digital marketing strategies, very practical for real-world use.",
          rating: 5,
          createdAt: "2024-11-17 14:00:00",
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

// npx sequelize-cli db:seed --seed seeder_course.js
