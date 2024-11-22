"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Video", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      urlVideo: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.INTEGER, // 1- Đã hoàn thành, 2- Chưa hoàn thành
      },
      LessonID: {
        type: Sequelize.INTEGER,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Video");
  },
};
