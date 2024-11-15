"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Mối quan hệ nhiều-kết-nhiều với Order qua OrderDetail
      Course.belongsToMany(models.Order, {
        through: "OrderDetail",
        foreignKey: "courseID",
      });

      // Một khóa học có nhiều đánh giá
      Course.hasMany(models.Review, {
        foreignKey: "courseID",
        as: "reviews",
      });

      // Một khóa học thuộc một danh mục
      Course.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "category",
      });

      // Một khóa học có thể có nhiều bài học (lesson)
      Course.hasMany(models.Lesson, {
        foreignKey: "lessonID",
        as: "lessons",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
      lessonID: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
