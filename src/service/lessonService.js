import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const findAllLesson = async () => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let lessons = await db.Lessons.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Video,
          attributes: ["id", "name", "state", "urlVideo"],
          as: "Video", // Kết nối với bảng Video
        },
      ],
    });

    return {
      EM: "find all lessons successfully",
      EC: 0,
      DT: lessons,
    };
  } catch (error) {
    console.error("Error in findAllLesson:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const getLessonByCourse = async (courseID) => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let lessons = await db.Lessons.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Video,
          attributes: ["id", "name", "state", "urlVideo"],
          as: "Video", // Kết nối với bảng Video
        },
      ],
      where: {
        courseID: courseID,
      },
    });

    return {
      EM: "find all lessons successfully",
      EC: 0,
      DT: lessons,
    };
  } catch (error) {
    console.error("Error in getLessonByCourse:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const createLesson = async (lessonID, title, courseID, name, urlVideo) => {
  try {
    let check = await db.Lessons.findOne({
      where: {
        id: lessonID,
      },
    });
    if (check) {
      // tạo video
      let video = await db.Video.create({
        name: name,
        urlVideo: urlVideo,
        lessonID: lessonID,
      });
    } else {
      // tạo lesson nếu lessonID không tồn tại
      let newLesson = await db.Lessons.create({
        title: title,
        courseID: courseID,
      });

      // tạo video
      let video = await db.Video.create({
        name: name,
        urlVideo: urlVideo,
        lessonID: newLesson.id,
      });
    }

    return {
      EM: "create lesson successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.error("Error in createLesson:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const deleteVideo = async (videoID) => {
  try {
    let video = await db.Video.destroy({
      where: {
        id: videoID,
      },
    });

    return {
      EM: "delete video lesson successfully",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.error("Error in deleteVideo:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const updateLesson = async (videoID, name, urlVideo) => {
  try {
    // update video
    let video = await db.Video.update(
      {
        name: name,
        urlVideo: urlVideo,
      },
      {
        where: {
          id: videoID,
        },
      }
    );

    return {
      EM: "update video lesson successfully",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.error("Error in updateLesson:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findAllLesson,
  getLessonByCourse,
  createLesson,
  deleteVideo,
  updateLesson,
};
