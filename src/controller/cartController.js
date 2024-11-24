import cartService from "../service/cartService";

// Get cart by userID
const getCartByUser = async (req, res) => {
  try {
    let data = await cartService.getCartByUserID(req.params.userID);
    return res.status(200).json({
      EM: "Get cart by user successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// Add course to cart
const addCourseToCart = async (req, res) => {
  const { userID, courseID } = req.query; // Lấy tham số từ query string

  console.log("userID from query:", userID); // Kiểm tra giá trị của userID

  // Kiểm tra nếu userID hoặc courseID không có giá trị
  if (!userID || !courseID) {
    return res.status(400).json({
      EM: "userID or courseID is missing",
      EC: -1,
      DT: "",
    });
  }

  try {
    // Gọi hàm addCourseToCart từ service với tham số lấy từ query
    let data = await cartService.addCourseToCart(userID, courseID);

    return res.status(200).json({
      EM: "Course added to cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// Remove course from cart
const removeCourseFromCart = async (req, res) => {
  try {
    let data = await cartService.deleteCourseFromCart(
      req.body.userID,
      req.body.courseID
    );
    return res.status(200).json({
      EM: "Course removed from cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// Remove all courses from cart
const removeAllCart = async (req, res) => {
  try {
    let data = await cartService.deleteAllCart(req.params.userID);
    return res.status(200).json({
      EM: "All courses removed from cart successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

// Get total price of the cart
const getTotalPrice = async (req, res) => {
  try {
    let data = await cartService.getTotalPrice(req.params.userID);
    return res.status(200).json({
      EM: "Total price calculated successfully",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
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
