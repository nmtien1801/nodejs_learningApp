"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      courseID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Courses",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      review: {
        type: Sequelize.TEXT,
      },
      rating: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable("Reviews");
  },
};
