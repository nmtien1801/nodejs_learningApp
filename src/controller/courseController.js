import courseService from "../service/courseService";

const handleFindCourse = async (req, res) => {
  try {
    let data = await courseService.findAllCourses();
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindCourse:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleFindCourseByState = async (req, res) => {
  try {
    let state = req.params.state;
    let data = await courseService.findByState(state);
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindCourseByState:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const handleFindCourseByID = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await courseService.findCourseByID(id);
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindCourseByID:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleFindCourse,
  handleFindCourseByState,
  handleFindCourseByID,
};
