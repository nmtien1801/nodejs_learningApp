import teacherService from "../service/teacherService";

const handleTeacherOverview = async (req, res) => {
  try {
    let teacherID = req.params.teacherID;
    let data = await teacherService.teacherOverview(teacherID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in handleTeacherOverview:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  handleTeacherOverview,
};
