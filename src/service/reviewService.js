import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
require("dotenv").config();

const findAllReviews = async () => {
  try {
    let reviews = await db.Review.findAll(); // Use `Review` here
    console.log(reviews);
    return {
      EM: "Find all reviews successfully",
      EC: 0,
      DT: reviews,
    };
  } catch (error) {
    console.error("Error in findAllReviews:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const getRatingCourse = async (courseID) => {
  try {
    let reviews = await db.Reviews.findAll({
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
  findAllReviews,
  getRatingCourse,
};
