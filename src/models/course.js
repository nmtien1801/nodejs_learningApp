"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      // Một khóa học thuộc một danh mục (Categories)
      Course.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "Category",
      });

      // Một khóa học có thể có nhiều bài học (Lessons)
      Course.hasMany(models.Lesson, {
        foreignKey: "courseID",
        as: "Lessons",
      });
    }
  }

  Course.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );

  return Course;
};
