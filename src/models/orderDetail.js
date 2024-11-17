"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class OrderDetail extends Model {
    static associate(models) {
      // Đây là bảng trung gian, nó không cần khai báo mối quan hệ nữa
    }
  }

  OrderDetail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
