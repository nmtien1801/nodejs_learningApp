import lessonService from "../service/lessonService";

const findAllLesson = async (req, res) => {
  try {
    let data = await lessonService.findAllLesson();
    console.log("data:", data);
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


module.exports = {
  findAllLesson,
};
