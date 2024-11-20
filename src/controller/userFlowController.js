import userFlowService from "../service/userFlowService"; // Import userFlowService to use its functions
const handleFindCourseByTeacherID_Categories = async (req, res) => {
  try {
    let teacherID = req.params.teacherID; // Get teacherID from URL params
    let data = await userFlowService.findCourseByTeacherID_Categories(
      teacherID
    ); // Call the service function to get the data
    return res.status(200).json({
      // Respond with the data from the service
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindCourseByTeacherID_Categories:", error); // Log any error
    return res.status(500).json({
      // Return an error response if something goes wrong
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleFindCourseByTeacherID_Categories,
};
