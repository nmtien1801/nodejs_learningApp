"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Lessons, {
        foreignKey: "lessonID",
        as: "lesson",
      });
    }
  }

  Project.init(
    {
      projectID: DataTypes.INTEGER,
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
