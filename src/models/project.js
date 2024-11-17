"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Lesson, {
        foreignKey: "lessonID",
        as: "Lesson",
      });

      Project.belongsTo(models.User, {
        foreignKey: "userID",
        as: "User",
      });
    }
  }

  Project.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: DataTypes.INTEGER,
      lessonID: DataTypes.INTEGER,
      description: DataTypes.STRING,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  return Project;
};
