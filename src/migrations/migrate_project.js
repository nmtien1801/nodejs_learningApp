"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userID: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING, // Lưu đường dẫn file
      },
      resource: {
        type: Sequelize.TEXT,
      },

      lessonID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Lesson",
        //   key: "id",
        // },
        // onDelete: "SET NULL",
        // onUpdate: "CASCADE",
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
    await queryInterface.dropTable("Projects");
  },
};
