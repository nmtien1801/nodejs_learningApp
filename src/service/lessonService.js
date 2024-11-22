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
          attributes: ["id", "urlVideo"],
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


module.exports = {
  findAllLesson,
 
};
