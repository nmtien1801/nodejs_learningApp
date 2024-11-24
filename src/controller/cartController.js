import cartService from "../service/cartService";

// get gio hang theo userID
const getCartByUser = async (req, res) => {
  try {
    let data = await cartService.getCartByUserID(req.params.userID);
    return res.status(200).json({
      EM: "get cart by user successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      EM: "error from sever",
      EC: -1,
      DT: "",
    });
  }
};

// them vao gio hang
const addCourseToCart = async (req, res) => {
  try {
    let data = await cartService.addCourseToCart(
      req.body.userID,
      req.body.courseID
    );
    return res.status(200).json({
      EM: "add course to cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever",
      EC: -1,
      DT: "",
    });
  }
};

// xoa khoi gio hang
const removeCourseFromCart = async (req, res) => {
  try {
    let data = await cartService.deleteCourseFromCart(
      req.body.userID,
      req.body.courseID
    );
    return res.status(200).json({
      EM: "remove course from cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever",
      EC: -1,
      DT: "",
    });
  }
};

// xoa toan bo gio hang
const removeAllCart = async (req, res) => {
  try {
    let data = await cartService.deleteAllCart(req.params.userID);
    return res.status(200).json({
      EM: "remove all cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever",
      EC: -1,
      DT: "",
    });
  }
};

// tinh tong tien gio hang
const getTotalPrice = async (req, res) => {
  try {
    let data = await cartService.getTotalPrice(req.params.userID);
    return res.status(200).json({
      EM: "get total price successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  getCartByUser,
  addCourseToCart,
  removeCourseFromCart,
  removeAllCart,
  getTotalPrice,
};
