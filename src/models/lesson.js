"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Lesson extends Model {
    static associate(models) {
      // Một bài học thuộc về một khóa học
      Lesson.belongsTo(models.Course, {
        foreignKey: "courseID",
        as: "Course",
      });
    }
  }

  Lesson.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );

  return Lesson;
};
