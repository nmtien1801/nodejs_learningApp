"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Course, {
        through: "OrderDetails", // bảng trung gian
        foreignKey: "orderID",
        as: "Courses",
      });
    }
  }

  Order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
