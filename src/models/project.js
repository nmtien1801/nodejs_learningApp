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
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );

  return Projects;
};
