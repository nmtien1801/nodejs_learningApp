"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Một giỏ hàng có thể chứa nhiều khóa học
      Cart.belongsToMany(models.Course, {
        foreignKey: "courseID",
        as: "course",
      });

      // Một giỏ hàng thuộc về một người dùng
      Cart.belongsTo(models.User, {
        foreignKey: "userID",
        as: "users",
      });
    }
  }

  Cart.init(
    {
      userID: DataTypes.INTEGER,
      courseID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  return Cart;
};
