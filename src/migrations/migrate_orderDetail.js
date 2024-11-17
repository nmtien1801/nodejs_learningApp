"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Orders",
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
      price: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("OrderDetails");
  },
};
