"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'User',  // Tên bảng mà khóa ngoại tham chiếu đến
        //   key: 'id'        // Trường trong bảng Users mà khóa ngoại tham chiếu
        // },
        // onDelete: 'CASCADE',  // Khi người dùng bị xóa, các giỏ hàng của họ cũng sẽ bị xóa
        // onUpdate: 'CASCADE',  // Cập nhật khi id người dùng thay đổi
      },
      courseID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Course',  // Tên bảng mà khóa ngoại tham chiếu đến
        //   key: 'id'          // Trường trong bảng Courses mà khóa ngoại tham chiếu
        // },
        // onDelete: 'CASCADE',  // Khi khóa học bị xóa, liên kết giỏ hàng cũng bị xóa
        // onUpdate: 'CASCADE',  // Cập nhật khi id khóa học thay đổi
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Carts");
  },
};
