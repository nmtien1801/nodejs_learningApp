import loginRegisterService from "../service/loginRegisterService";

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    console.log("check control login", req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check control login", req.body);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    return res.status(200).json({
      EM: "clear cookies - logout",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console.log("check control login: ", req.body);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

module.exports = {
  //   handleRegister,
  handleLogin,
  handleLogout,
};
