"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Projects extends Model {
    static associate(models) {
     
    }
  }

  Projects.init(
    {
      userID: DataTypes.INTEGER,
      description: DataTypes.STRING,
      file: DataTypes.STRING, // Lưu đường dẫn file
      resource: DataTypes.TEXT,
      lessonID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );

  return Projects;
};
