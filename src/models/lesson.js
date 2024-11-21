"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Một bài học thuộc về một khóa học
      Lessons.belongsTo(models.Course, {
        foreignKey: "lessonID",
        as: "course",
      });
      Lessons.hasMany(models.Project, {
        foreignKey: "lessonID", // Khoá ngoại trong bảng Project
        as: "projects", // Định danh quan hệ
      });
    }
  }
  Lessons.init(
    {
      lessonID: DataTypes.INTEGER,
      title: DataTypes.STRING,
      urlVideo: DataTypes.STRING,
      state: DataTypes.BOOLEAN, // Cột state là kiểu BOOLEAN
      courseID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lessons",
    }
  );
  return Lessons;
};
