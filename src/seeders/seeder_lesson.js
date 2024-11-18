"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Lessons",
      [
        {
          title: "Introduction to JavaScript",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
        },
        {
          title: "Advanced JavaScript Concepts",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
        },
        {
          title: "React Basics",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
        },
        {
          title: "Node.js for Beginners",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
        },
        {
          title: "Web Development with HTML & CSS",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
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
