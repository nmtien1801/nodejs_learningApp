"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      projectID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "User",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      description: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING, // Lưu đường dẫn file
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
