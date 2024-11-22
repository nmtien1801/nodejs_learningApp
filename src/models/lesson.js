"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    static associate(models) {
      // Một bài học thuộc về một khóa học
      Lessons.belongsTo(models.Course, {
        foreignKey: "courseID",
        as: "course",
      });
      Lessons.hasMany(models.Project, {
        foreignKey: "lessonID", // Khoá ngoại trong bảng Project
        as: "projects", // Định danh quan hệ
      });
      Lessons.hasMany(models.Video, {
        foreignKey: "lessonID", // Khoá ngoại trong bảng Video
        as: "Video", // Định danh quan hệ
      });
    }
  }
  Lessons.init(
    {
      title: DataTypes.STRING,
      courseID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lessons",
    }
  );
  return Lessons;
};
