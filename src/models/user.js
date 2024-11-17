"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, {
        foreignKey: "userID",
        as: "Reviews",
      });

      User.hasMany(models.Order, {
        foreignKey: "userID",
        as: "Orders",
      });

      User.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "Role",
      });

      User.hasMany(models.Project, {
        foreignKey: "userID",
        as: "Projects",
      });
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
