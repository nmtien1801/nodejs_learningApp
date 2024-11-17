import reviewService from "../service/reviewService.js";

const handleGetRatingCourse = async (req, res) => {
  try {
    let courseID = req.params.courseID;
    let data = await reviewService.getRatingCourse(courseID);
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleGetRatingCourse:", error);
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
module.exports = {
  handleGetRatingCourse,
  handleFindReviewByCourseID,
};
