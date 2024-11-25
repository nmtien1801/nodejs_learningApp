"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Một giỏ hàng có thể chứa nhiều khóa học
      // Liên kết Cart và Course qua khóa ngoại courseID
      Cart.belongsTo(models.Course, {
        foreignKey: "courseID", // Thêm khóa ngoại courseID trong Cart
        as: "course", // Alias cho mối quan hệ
      });

      // Một giỏ hàng thuộc về một người dùng
      Cart.belongsTo(models.User, {
        foreignKey: "userID", // Khóa ngoại để liên kết với User
        as: "user", // Alias cho mối quan hệ
      });
    }
  }

  Cart.init(
    {
      userID: DataTypes.INTEGER, // Khóa ngoại liên kết với User
      courseID: DataTypes.INTEGER, // Khóa ngoại liên kết với Course
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Carts", // Tên bảng là 'Carts'
    }
  );

  return Cart;
};
