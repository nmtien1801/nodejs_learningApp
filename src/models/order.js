"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
