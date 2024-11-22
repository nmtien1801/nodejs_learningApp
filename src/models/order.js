"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsToMany(models.Course, {
        through: models.OrderDetail, // Đảm bảo dùng model trung gian -> map tới orderDetail để tạo mối quan hệ n-n giữa Orders và Course
        foreignKey: "orderID", // khoá ngoại
        otherKey: "courseID",
        as: "Courses",
      });
    }
  }
  Orders.init(
    {
      userID: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
