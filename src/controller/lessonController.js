import lessonService from "../service/lessonService";

const findAllLesson = async (req, res) => {
  try {
    let data = await lessonService.findAllLesson();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in findAllLesson:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getLessonByCourse = async (req, res) => {
  try {
    let courseID = req.params.courseID;
    let data = await lessonService.getLessonByCourse(courseID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getLessonByCourse:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const createLesson = async (req, res) => {
  try {
    let { lessonID, title, courseID, name, urlVideo } = req.body;
    let data = await lessonService.createLesson(lessonID, title, courseID, name, urlVideo);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in createLesson:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    let videoID = req.params.id;
    let data = await lessonService.deleteVideo(videoID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in deleteVideo:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

const updateLesson = async (req, res) => {
  try {
    let { videoID, name, urlVideo } = req.body;
    let data = await lessonService.updateLesson(videoID, name, urlVideo);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in updateLesson:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

module.exports = {
  findAllLesson,
  getLessonByCourse,
  createLesson,
  deleteVideo,
  updateLesson,
};
