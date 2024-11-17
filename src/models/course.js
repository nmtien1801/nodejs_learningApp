"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Mối quan hệ nhiều-kết-nhiều với Order qua OrderDetail
      Course.belongsToMany(models.Order, {
        through: "OrderDetail",
        foreignKey: "courseID",
        otherKey: "orderID", // Sử dụng foreignKey khác trong bảng OrderDetail
      });

      // Một khóa học có nhiều đánh giá
      Course.hasMany(models.Review, {
        foreignKey: "courseID", // Khóa ngoại phải là courseID
        as: "reviews", // Dữ liệu sẽ được lấy với alias "reviews"
      });

      // Một khóa học thuộc một danh mục
      Course.belongsTo(models.Category, {
        foreignKey: "categoryID", // Khóa ngoại
        as: "category", // Alias cho quan hệ này
      });

      // Một khóa học có thể có nhiều bài học (lesson)
      Course.hasMany(models.Lesson, {
        foreignKey: "courseID", // Khóa ngoại là courseID
        as: "lessons", // Alias cho bài học
      });
    }
  }

  // Định nghĩa các thuộc tính của Course
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Không cho phép trường này null
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, // Mô tả có thể là null
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true, // Hình ảnh có thể null
      },
      categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Không cho phép categoryID null
      },
      lessonID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể null nếu khóa học không có bài học
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false, // Trạng thái không thể null
      },
    },
    {
      sequelize,
      modelName: "Course", // Đặt tên mô hình
      tableName: "Courses", // Đảm bảo tên bảng là 'Courses'
      timestamps: true, // Sử dụng `createdAt` và `updatedAt`
    }
  );

  return Course;
};
