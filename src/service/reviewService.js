import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
require("dotenv").config();

const findReviewByCourseID = async (courseID) => {
  try {
    // Lấy tất cả đánh giá cùng với thông tin khóa học
    let reviews = await db.Review.findAll({
      where: {
        courseID: courseID, // Lọc theo courseID
      },
      include: [
        {
          model: db.Course, // Bao gồm thông tin từ bảng Course
          as: "course", // Sử dụng alias đúng "course" thay vì "Course"
          required: true, // Yêu cầu kết nối phải có dữ liệu từ bảng Course
        },
      ],
    });

    console.log("reviews:", reviews);

    return {
      EM: "Find all reviews successfully",
      EC: 0,
      DT: reviews,
    };
  } catch (error) {
    console.error("Error in findReviewByCourseID:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const getRatingCourse = async (courseID) => {
  try {
    // Sử dụng db.Review thay vì db.Reviews
    let reviews = await db.Review.findAll({
      where: {
        courseID: courseID,
      },
    });
    let totalRating = 0;
    let totalReviews = reviews.length;

    if (totalReviews > 0) {
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      let avgRating = totalRating / totalReviews;
      return {
        EM: "Get rating course successfully",
        EC: 0,
        DT: avgRating,
      };
    } else {
      return {
        EM: "No reviews found for this course",
        EC: -1,
        DT: 0,
      };
    }
  } catch (error) {
    console.error("Error in getRatingCourse:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findReviewByCourseID,
  getRatingCourse,
};
