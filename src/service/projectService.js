import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { at } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const getProjectByUser = async (userID) => {

  try {
    let project = await db.Projects.findAll({
      where: {
        userID: userID,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },  // loại bỏ các trường không cần thiết
    });

    // ảnh
    // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
    if (project && project.length > 0) {
      project.map((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, "base64").toString("binary"); 
        }
      });
    }

    return {
      EM: "find teacher successfully",
      EC: 0,
      DT: project,
    };
  } catch (error) {
    console.error("Error in getProjectByUser:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const createProject = async (userID, name, description, image) => {
  try {
    let project = await db.Projects.create({
      userID: userID,
      name: name,
      description: description,
      image: image,
    });
    return {
      EM: "create project successfully",
      EC: 0,
      DT: project,
    };
  } catch (error) {
    console.error("Error in createProject service:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
    getProjectByUser,
    createProject
};
