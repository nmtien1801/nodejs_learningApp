"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Course", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      descProject: {
        type: Sequelize.STRING,
      },

      categoryID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Category",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      lessonID: {
        type: Sequelize.INTEGER, // có những bài học nào
        // references: {
        //   model: "Lesson",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      state: {
        type: Sequelize.INTEGER, // trạng thái khóa học (0 - chưa bắt đầu, 1 - đang học, 2 - đã hoàn thành)
      },

      price: {
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
    await queryInterface.dropTable("Course");
  },
};
