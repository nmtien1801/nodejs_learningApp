"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      description: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING, // tiểu sử của người dùng
      },
      roleID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Role",
        //   key: "id",
        // },
        // onDelete: "SET NULL",
        // onUpdate: "CASCADE",
      },
      projectID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Project",
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
    await queryInterface.dropTable("User");
  },
};

// npx sequelize-cli db:migrate --to migrate_users.js
