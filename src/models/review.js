"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Một đánh giá thuộc về một khóa học
      Review.belongsTo(models.Course, {
        foreignKey: "courseID",
        as: "course",
      });

      // Một đánh giá thuộc về một người dùng
      Review.belongsTo(models.User, {
        foreignKey: "userID",
        as: "user",
      });
    }
  }
  Review.init(
    {
      userID: DataTypes.INTEGER,
      courseID: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "Reviews",
    }
  );
  return Review;
};

// npx sequelize-cli db:migrate
