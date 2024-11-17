"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Course, {
        foreignKey: "courseID",
        as: "Course",
      });

      Review.belongsTo(models.User, {
        foreignKey: "userID",
        as: "User",
      });
    }
  }

  Review.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: DataTypes.INTEGER,
      courseID: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};
