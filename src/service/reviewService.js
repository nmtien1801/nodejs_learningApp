import db from "../models/index";

require("dotenv").config();

const findAllReviews = async () => {
  try {
    let reviews = await db.Reviews.findAll();
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

// getRatingCourse(course Id) → tính TB rating của khóa đó (cộng listRating / sluong)
const getRatingCourse = async (courseID) => {
  try {
    let listRating = await db.Review.findAll({
      where: {
        id: courseID,
      },
    });
    let sumRating = 0;
    listRating.forEach((rating) => {
      sumRating += rating.rating;
    });
    let avgRating = sumRating / listRating.length;
    return {
      EM: "get rating course successfully",
      EC: 0,
      DT: avgRating,
    };
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
