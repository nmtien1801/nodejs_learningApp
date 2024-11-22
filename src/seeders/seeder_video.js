"use strict";

const course = require("../models/course");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Video",
      [
        {
          name: 'Amet adipisicing consectetur',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 1,
        },
        {
          name:'Adipisicing dolor amet occaeca',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 1,
        },
        {
          name: 'Adipisicing dolor amet occaeca',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 2,
        },
        {
          name:'Exercitation elit incididunt esse',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 2,
        },
        {
          name:'Duis esse ipsum laboru',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 2,
        },
        {
          name:'Labore minim reprehenderit pariaturea deserunt',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 2,
        },
        {
          name:'Exercitation minim ipsum laboru pariaturea deserunt',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 3,
        },
        {
          name:'Labore minim reprehenderit ipsum laboru',
          urlVideo: "https://youtu.be/vs5N49eZyKg?list=RDvs5N49eZyKg",
          lessonID: 4,
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
