"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Một người dùng có thể có nhiều đánh giá
      User.hasMany(models.Review, {
        foreignKey: "userID",
        as: "reviews",
      });

      // Một người dùng có thể có nhiều đơn hàng
      User.hasMany(models.Orders, {
        foreignKey: "userID",
        as: "orders",
      });

      // Một người dùng thuộc về một vai trò
      User.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "role",
      });

      // Một người dùng có thể có nhiều dự án (giả sử có mối quan hệ như vậy)
      User.hasMany(models.Projects, {
        foreignKey: "userID",
        as: "projects",
      });

      User.hasMany(models.UserFollow, {
        foreignKey: "userID",
        as: "userFollows",
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      title: DataTypes.STRING,
      roleID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
