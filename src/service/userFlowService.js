import db from "../models/index";
import { Op } from "sequelize";

const findCourseByTeacherID_Categories = async (teacherID) => {
  try {
    // Fetch courses followed by the teacher
    let courses = await db.UserFollow.findAll({
      where: { userID: teacherID },
      attributes: ["courseID"],
    });

    // Extract courseIDs
    let courseIDs = courses.map((course) => course.courseID);
    console.log("courseIDs:", courseIDs);

    // If no courses found, return a response
    if (courseIDs.length === 0) {
      return {
        EM: "No courses found for this teacher",
        EC: 1,
        DT: [],
      };
    }

    // Fetch course details along with categories
    let courseDetails = await db.Course.findAll({
      where: { id: { [Op.in]: courseIDs } },
      include: [
        {
          model: db.Category,
          as: "Category", // Alias trùng với alias trong mô hình
          attributes: ["name"],
        },
      ],
    });

    return {
      EM: "find teacher successfully",
      EC: 0,
      DT: courseDetails,
    };
  } catch (error) {
    console.error("Error in findCourseByTeacherID_Categories:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findCourseByTeacherID_Categories,
};
