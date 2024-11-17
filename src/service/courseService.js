import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
require("dotenv").config();

const findAllCourses = async () => {
  try {
    let courses = await db.Course.findAll();
    return {
      EM: "find all courses successfully",
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
      EM: "findyByState is created successfully",
      EC: 0,
      DT: courses,
    };
  } catch (error) {
    console.error("Error in findByState:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseByID = async (id) => {
  try {
    let course = await db.Course.findOne({
      where: {
        id: id,
      },
    });
    return {
      EM: "findCourseByID is created successfully",
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
