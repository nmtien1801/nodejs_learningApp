import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const findAllCourses = async () => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let courses = await db.Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
      ],
    });

    // Tính trung bình rating cho từng khóa học
    const coursesWithAverageRating = courses.map((course) => {
      // Lấy danh sách các rating của review cho khóa học
      const ratings = course.Review.map((review) => review.rating);

      // Tính trung bình của các rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
      };
    });

    return {
      EM: "find all courses successfully",
      EC: 0,
      DT: coursesWithAverageRating,
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
      attributes: { exclude: ["createdAt", "updatedAt"] }, // không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review",
        },
      ],

      // lấy ra số rating trung bình của khóa học
      attributes: {
        include: [
          [
            db.sequelize.fn("AVG", db.sequelize.col("Review.rating")),
            "averageRating",
          ],
        ],
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
