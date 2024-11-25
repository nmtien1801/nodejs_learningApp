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

const handleFindPopularCourses = async (req, res) => {
  try {
    let data = await courseService.findPopularCourses();
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindPopularCourses:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

const handleFindCourseSimilar = async (req, res) => {
  try {
    let data = await courseService.findCourseSimilar(req.params.id);
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleFindCourseSimilar:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

const addNewCourse = async (req, res) => {
  try {
    let data = await courseService.addNewCourse(req.body);
    console.log("data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in addNewCourse:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

module.exports = {
  handleFindCourse,
  handleFindCourseByID,
  handleFindPopularCourses,
  handleFindCourseSimilar,
  addNewCourse
};
