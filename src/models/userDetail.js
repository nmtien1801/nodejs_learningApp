"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserDetail extends Model {
    static associate(models) {
      // define association here
    }
  }

  UserDetail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: DataTypes.INTEGER,
      courseID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserDetail",
    }
  );

  return UserDetail;
};
