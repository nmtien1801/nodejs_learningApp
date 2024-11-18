"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Course, {
        through: "OrderDetail", // map tới orderDetail để tạo mối quan hệ n-n giữa Order và Course
        foreignKey: "orderID", // khoá ngoại
      });
    }
  }
  Order.init(
    {
      userID: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
