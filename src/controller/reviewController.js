import reviewService from "../service/reviewService.js";

const handleGetCourseReviewsAndAverageRating = async (req, res) => {
  try {
    let courseID = req.params.courseID;
    let data = await reviewService.getCourseReviewsAndAverageRating(courseID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleGetCourseReviewsAndAverageRating:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};
const handleFindReviewByCourseID = async (req, res) => {
  try {
    let courseID = req.params.courseID;
    let data = await reviewService.findReviewByCourseID(courseID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindReviewByCourseID:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// Đánh giá khóa học
const handleCreateReview = async (req, res) => {
  try {
    let { userID, courseID, rating } = req.body;
    let data = await reviewService.addReview(userID, courseID, rating);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleCreateReview:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleFindReviewByCourseID,
  handleGetCourseReviewsAndAverageRating,
  handleCreateReview,
};
