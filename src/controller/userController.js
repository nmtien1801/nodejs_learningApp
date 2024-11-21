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

module.exports = {
    getTopTeacher
};
