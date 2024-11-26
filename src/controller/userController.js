import userService from "../service/userService.js";

const getTopTeacher = async (req, res) => {
  try {
   
    let data = await userService.getTopTeacher();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getTopTeacher:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const getAllCourseUser = async (req, res) => {
  try {
    let data = await userService.getAllCourseUser(req.params.userID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getAllCourseUser:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

const findCourseUserState1 = async (req, res) => {
  try {
    let data = await userService.findCourseUserState1(req.params.userID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in findCourseUserState1:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

const findCourseUserState2 = async (req, res) => {
  try {
    let data = await userService.findCourseUserState2(req.params.userID);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in findCourseUserState2:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
}

module.exports = {
    getTopTeacher,
    getAllCourseUser,
    findCourseUserState1,
    findCourseUserState2
};
