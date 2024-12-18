"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Một vai trò có thể có nhiều người dùng
      Role.hasMany(models.User, {
        foreignKey: "roleID", // Khoá ngoại trong bảng User
        as: "users", // Định danh quan hệ
      });
    }
  }

  Role.init(
    {
      roleID: DataTypes.INTEGER,
      name: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );

  return Role;
};
