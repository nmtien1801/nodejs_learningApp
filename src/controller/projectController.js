import projectService from "../service/projectService.js";

const getProjectByUser = async (req, res) => {
  try {
    let userID = req.params.userID;
    let data = await projectService.getProjectByUser(userID);
    
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getProjectByUser:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const createProject = async (req, res) => {
  try {
    let userID = req.body.userID;
    let name = req.body.name;
    let description = req.body.desc;
    let image = req.body.file.uri;
    
    let data = await projectService.createProject(userID, name, description, image);
    
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in createProject:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
    getProjectByUser,
    createProject
  
};
