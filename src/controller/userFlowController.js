import userFlowService from "../service/userFlowService"; // Import service để gọi function

const handleFindCourseByTeacherID_Categories = async (req, res) => {
  try {
    let teacherID = req.params.teacherID; // Lấy teacherID từ tham số URL
    let data = await userFlowService.findCourseByTeacherID_Categories(
      teacherID
    ); // Gọi function từ service

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // Trả kết quả từ service
    });
  } catch (error) {
    console.error("Error in handleFindCourseByTeacherID_Categories:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getCourseOfUser = async (req, res) => {
  try {
    let userID = req.params.userID;
    let data = await userFlowService.getCourseOfUser(userID);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getCourseOfUser:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getSaveCourseOfUser = async (req, res) => {
  try {
    let userID = req.params.userID;
    let data = await userFlowService.getSaveCourseOfUser(userID);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getSaveCourseOfUser:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleFindCourseByTeacherID_Categories,
  getCourseOfUser,
  getSaveCourseOfUser,
};
