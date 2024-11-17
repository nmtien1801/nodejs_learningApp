"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Đảm bảo không được null
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING, // Loại dữ liệu hình ảnh
      },
      categoryID: {
        type: Sequelize.INTEGER,
        allowNull: false, // Đảm bảo categoryID không được null
        references: {
          model: "Categories", // Tên bảng Categories
          key: "id", // Khóa chính của bảng Categories
        },
        onUpdate: "CASCADE", // Cập nhật khi có thay đổi trong bảng Categories
        onDelete: "SET NULL", // Giữ lại khóa ngoại NULL khi xóa bảng Categories
      },
      state: {
        type: Sequelize.INTEGER, // Trạng thái khóa học
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Mặc định là thời gian hiện tại
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Mặc định là thời gian hiện tại
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Courses");
  },
};
