import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
require("dotenv").config();

const findAllCourses = async () => {
  try {
    let courses = await db.Course.findAll();
    return {
      EM: "A user is created successfully",
      EC: 0,
      DT: courses,
    };
  } catch (error) {
    console.error("Error in findAllCourses:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findyByState = async (state) => {
  try {
    let courses = await db.Course.findAll({
      where: {
        state: state,
      },
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
      DT: courses,
    };
  } catch (error) {
    console.error("Error in findyByState:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findAllCourses,
  findyByState,
};
