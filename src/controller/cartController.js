import cartService from "../service/cartService";

// Get cart by userID
const getCartByUser = async (req, res) => {
  try {
    // Lấy dữ liệu giỏ hàng từ service mà không cần thông điệp lồng
    let data = await cartService.getCartByUserID(req.params.userID);

    // Trả về kết quả dưới dạng JSON
    return res.status(200).json({
      EM: "Get cart by user successfully", // Thông điệp thành công
      EC: 0, // Mã thành công
      DT: data, // Dữ liệu giỏ hàng đã được xử lý
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "", // Trả về dữ liệu rỗng khi có lỗi
    });
  }
};

// Add course to cart
const addCourseToCart = async (req, res) => {
  const { userID, courseID } = req.query; // Lấy tham số từ query string

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

// Xóa các mục được chọn khỏi giỏ hàng
const removeSelectedCartItems = async (req, res) => {
  const { cartIDs } = req.body; // Nhận danh sách `cartIDs` từ body của request

  // Kiểm tra `cartIDs` có phải là mảng hay không
  if (!Array.isArray(cartIDs)) {
    return res.status(400).json({
      EM: "cartIDs must be an array",
      EC: -1,
      DT: "",
    });
  }

  try {
    // Sử dụng hàm từ service để xóa các mục trong giỏ hàng
    const deletedCount = await cartService.deleteSelectedCartItems(cartIDs);

    // Kiểm tra số lượng mục đã xóa
    if (deletedCount === 0) {
      return res.status(404).json({
        EM: "Selected items not found in cart",
        EC: -1,
        DT: "",
      });
    }

    res.status(200).json({
      EM: "Selected items removed successfully",
      EC: 0,
      DT: deletedCount,
    });
  } catch (error) {
    console.log("lỗi", error);
    res.status(500).json({
      EM: "Error removing selected items",
      EC: -1,
      DT: "",
    });
  }
};

const calculateTotalPrice = async (req, res) => {
  const { cartIDs } = req.body; // Nhận danh sách `cartIDs` từ body của request

  // Kiểm tra `cartIDs` có phải là mảng hay không
  if (!Array.isArray(cartIDs)) {
    return res.status(400).json({
      EM: "cartIDs must be an array",
      EC: -1,
      DT: "",
    });
  }

  try {
    const totalPrice = await cartService.calculateTotalPrice(cartIDs);
    res.status(200).json({
      EM: "Total price calculated successfully",
      EC: 0,
      DT: totalPrice,
    });
  } catch (error) {
    console.log("lỗi", error);
    res.status(500).json({
      EM: "Error calculating total price",
      EC: -1,
      DT: "",
    });
  }
};

const deleteSelectedCourse = async (req, res) => {
  const { courseID } = req.body; // Nhận danh sách `courseID` từ body của request

  // Kiểm tra `courseID` có phải là mảng hay không
  if (!Array.isArray(courseID)) {
    return res.status(400).json({
      EM: "courseID must be an array",
      EC: -1,
      DT: "",
    });
  }

  try {
    const deletedCount = await cartService.deleteSelectedCourse(courseID);
    res.status(200).json({
      EM: "Selected items removed successfully",
      EC: 0,
      DT: deletedCount,
    });
  } catch (error) {
    console.log("lỗi", error);
    res.status(500).json({
      EM: "Error removing selected items",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  getCartByUser,
  addCourseToCart,
  removeSelectedCartItems,
  calculateTotalPrice,
  deleteSelectedCourse,
};
