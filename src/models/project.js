"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Lesson, {
        foreignKey: "lessonID",
        as: "lesson",
      });

      Project.belongsTo(models.User, {
        foreignKey: "userID",
        as: "user",
      });
    }
  }

  Project.init(
    {
      projectID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      description: DataTypes.STRING,
      file: DataTypes.STRING, // Lưu đường dẫn file
      lessonID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  return Project;
};
