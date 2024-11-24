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
module.exports = {
    getProjectByUser,
};
