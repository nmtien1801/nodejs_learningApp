"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      // define association here
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
