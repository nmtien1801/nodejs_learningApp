import db from "../models/index";

import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
require("dotenv").config();

const findAllCourses = async () => {
  try {
    let courses = await db.Course.findAll();
    return {
      EM: "Find all courses successfully",
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

const findByState = async (state) => {
  try {
    let courses = await db.Course.findAll({
      where: {
        state: state,
      },
    });
    return {
      EM: "Find courses by state successfully",
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

const findCourseByID = async (courseID) => {
  try {
    let course = await db.Course.findOne({
      where: {
        id: courseID,
      },
    });
    return {
      EM: "Find course by ID successfully",
      EC: 0,
      DT: course,
    };
  } catch (error) {
    console.error("Error in findCourseByID:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  findAllCourses,
  findByState,
  findCourseByID,
};
