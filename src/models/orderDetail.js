"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Orders, {
        foreignKey: "orderID",
        as: "Order",
      });
      OrderDetail.belongsTo(models.Course, {
        foreignKey: "courseID",
        as: "Course",
      });
    }
  }
  OrderDetail.init(
    {
      orderID: DataTypes.INTEGER,
      courseID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
