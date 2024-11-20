"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Một danh mục có thể có nhiều khóa học
      Category.hasMany(models.Course, {
        foreignKey: "categoryID",
        as: "Category", // Đảm bảo alias trùng với phần 'include'
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
      tableName: "Categories", // Đảm bảo tên bảng đúng
    }
  );
  return Category;
};
