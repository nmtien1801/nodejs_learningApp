"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // nhiều video thuộc về một bài học
      Video.belongsTo(models.Lessons, {
        foreignKey: "lessonID",
        as: "lesson",
      });
    }
  }
  Video.init(
    {
      name: DataTypes.STRING,
      urlVideo: DataTypes.STRING,
      lessonID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Video",
    }
  );
  return Video;
};
