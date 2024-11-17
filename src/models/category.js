"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Course, {
        foreignKey: "categoryID",
        as: "Courses",
      });
    }
  }

  Category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING, // Bạn có thể thêm các trường khác nếu cần
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
