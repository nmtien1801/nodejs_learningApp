"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Mối quan hệ nhiều-kết-nhiều với Order qua OrderDetail
      Course.belongsToMany(models.Orders, {
        through: models.OrderDetail, // Đảm bảo dùng model trung gian
        foreignKey: "courseID",
        otherKey: "orderID", // Sử dụng foreignKey khác trong bảng OrderDetail
        as: "Orders", // Tên bí danh để dùng trong include
      });

      // Một khóa học có nhiều đánh giá
      Course.hasMany(models.Review, {
        foreignKey: "courseID", // Khóa ngoại phải là courseID
        as: "Review", // Dữ liệu sẽ được lấy với alias "reviews"
      });

      // Một khóa học thuộc một danh mục
      Course.belongsTo(models.Category, {
        foreignKey: "categoryID", // Khóa ngoại
        as: "Category", // Alias cho quan hệ này
      });

      // Một khóa học có thể có nhiều bài học (lesson)
      Course.hasMany(models.Lessons, {
        foreignKey: "courseID", // Khóa ngoại là courseID
        as: "Lesson", // Alias cho bài học
      });

      // Một khóa học có thể có nhiều người theo dõi
      Course.hasMany(models.UserFollow, {
        foreignKey: "courseID", // Khóa ngoại là courseID
        as: "UserFollow", // Alias cho người theo dõi
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
      title: {
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
      timestamps: true, // Sử dụng `createdAt` và `updatedAt`
    }
  );

  return Course;
};
