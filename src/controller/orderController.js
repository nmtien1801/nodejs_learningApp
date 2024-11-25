import orderService from "../service/orderService";

const handleGetOrderByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({
        EM: "Thiếu userID trong request",
        EC: 1,
        DT: null,
      });
    }

    const result = await orderService.getOrdersByUserId(userID);

    // Trả thẳng kết quả từ service mà không bọc thêm
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in handleGetOrderByUserID:", error);

    return res.status(500).json({
      EM: "Lỗi từ server",
      EC: -1,
      DT: null,
    });
  }
};

const handleBuyCourses = async (req, res) => {
  try {
    let { userID, courseIDs } = req.body;

    // Chuyển đổi courseIDs thành mảng nếu nó là một chuỗi
    if (typeof courseIDs === "string") {
      courseIDs = [courseIDs]; // Nếu là chuỗi, chuyển thành mảng
    }

    if (!userID || !Array.isArray(courseIDs) || courseIDs.length === 0) {
      return res.status(400).json({
        EM: "Thiếu userID hoặc courseIDs không hợp lệ trong request",
        EC: 1,
        DT: null,
      });
    }

    const result = await orderService.buyCourses(userID, courseIDs);
    return res.status(200).json(result); // Trả về kết quả từ buyCourses
  } catch (error) {
    console.error("Error in handleBuyCourses:", error);
    return res.status(500).json({
      EM: "Lỗi từ server",
      EC: -1,
      DT: null,
    });
  }
};

module.exports = {
  handleGetOrderByUserID,
  handleBuyCourses,
};
