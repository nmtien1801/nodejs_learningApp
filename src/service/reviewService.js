import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { at } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const findReviewByCourseID = async (courseID) => {
  try {
    // Lấy tất cả đánh giá cùng với thông tin khóa học
    let reviews = await db.Review.findAll({
      where: {
        courseID: courseID, // Lọc theo courseID
      },
      attributes: ["id", "rating", "review", "time"],
      include: [
        {
          model: db.Course, // Bao gồm thông tin từ bảng Course
          as: "course", // Sử dụng alias đúng "course" thay vì "Course"
          required: true, // Yêu cầu kết nối phải có dữ liệu từ bảng Course
        },
        // user
        {
          model: db.User, // Bao gồm thông tin từ bảng User
          as: "user", // Sử dụng alias đúng "user" thay vì "User"
          required: true, // Yêu cầu kết nối phải có dữ liệu từ bảng User
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

const getCourseReviewsAndAverageRating = async (courseID) => {
  try {
    // Lấy tất cả đánh giá
    let reviews = await db.Review.findAll({
      where: {
        courseID: courseID,
      },
      attributes: ["id", "userID", "courseID", "rating", "review", "time"],
      include: [
        {
          model: db.Course,
          attributes: ["name", "title"],
          as: "course",
        },
      ],
    });

    let totalRating = 0;
    let totalReviews = reviews.length;

    if (totalReviews > 0) {
      // Tính điểm trung bình
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      let avgRating = totalRating / totalReviews;

      return {
        EM: "Get reviews and average rating successfully",
        EC: 0,
        DT: {
          reviews: reviews,
          avgRating: avgRating,
        },
      };
    } else {
      return {
        EM: "No reviews found for this course",
        EC: -1,
        DT: {
          reviews: [],
          avgRating: 0,
        },
      };
    }
  } catch (error) {
    console.error("Error in getCourseReviewsAndAverageRating:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

// Đánh giá khóa học
const addReview = async (courseID, userID, rating, review) => {
  try {
    // Kiểm tra xem userId và courseId có hợp lệ không
    if (!userID || !courseID) {
      throw new Error("userId hoặc courseId không hợp lệ");
    }

    // Log giá trị userID và courseID để kiểm tra
    console.log("Adding review - userID:", userID, "courseID:", courseID);

    // Tạo một đánh giá mới
    const newReview = await db.Review.create({
      courseID: courseID,
      userID: userID,
      rating: rating,
      // review: review,
      // time: new Date(),
    });

    // Trả về thông báo thành công
    return {
      EM: "Đánh giá khóa học thành công",
      EC: 0,
      DT: newReview,
    };
  } catch (error) {
    console.error("Lỗi khi thêm đánh giá:", error);
    return {
      EM: "Không thể thêm đánh giá. Vui lòng thử lại sau.",
      EC: -2,
      DT: null,
    };
  }
};
module.exports = {
  findReviewByCourseID,
  getCourseReviewsAndAverageRating,
  addReview,
};
