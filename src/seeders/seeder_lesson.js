"use strict";

const course = require("../models/course");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Lessons",
      [
        {
          title: "Introduction to JavaScript",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          courseID: 1,
        },
        {
          title: "Advanced JavaScript Concepts",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          courseID: 1,
        },
        {
          title: "React Basics",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          courseID: 1,
        },
        {
          title: "Node.js for Beginners",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          courseID: 1,
        },
        {
          title: "Web Development with HTML & CSS",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
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
