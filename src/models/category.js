"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Một danh mục có thể có nhiều khóa học
      Category.hasMany(models.Course, {
        foreignKey: "categoryID",
        as: "courses",
      });
    }
  }
  Category.init(
    {
      categoryID: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
