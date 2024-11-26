"use strict";

const course = require("../models/course");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Video", // 20data
      [
        {
          name: "Amet adipisicing consectetur",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          lessonID: 1,
        },
        {
          name: "Adipisicing dolor amet occaeca",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          lessonID: 1,
        },
        {
          name: "Adipisicing dolor amet occaeca",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 2,
        },
        {
          name: "Exercitation elit incididunt esse",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          lessonID: 2,
        },
        {
          name: "Duis esse ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 2,
        },
        {
          name: "Labore minim reprehenderit pariaturea deserunt",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 1, // Đã hoàn thành
          lessonID: 2,
        },
        {
          name: "Exercitation minim ipsum laboru pariaturea deserunt",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 3,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 4,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 5,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 6,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 7,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 8,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 9,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 10,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 11,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 12,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 13,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 14,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 15,
        },
        {
          name: "Labore minim reprehenderit ipsum laboru",
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          state: 2, // chưa hoàn thành
          lessonID: 16,
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
