import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { at } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const teacherOverview = async (teacherID) => {
  // role = 1: teacher    /teacher/
  //  user  có id = teacherID
  // id, username, email, phone, address, image, roleID,

  try {
    let teacher = await db.User.findOne({
      where: {
        id: teacherID,
        roleID: 1,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    return {
      EM: "find teacher successfully",
      EC: 0,
      DT: teacher,
    };
  } catch (error) {
    console.error("Error in teacherOverview:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  teacherOverview,
};
