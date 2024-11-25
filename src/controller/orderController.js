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

const handleBuyCourse = async (req, res) => {
  try {
    const { userID, courseID } = req.query;

    if (!userID || !courseID) {
      return res.status(400).json({
        EM: "Thiếu userID hoặc courseID trong request",
        EC: 1,
        DT: null,
      });
    }

    const result = await orderService.buyCourse(userID, courseID);

    return res.status(200).json(result); // Directly return the result from buyCourse
  } catch (error) {
    console.error("Error in handleBuyCourse:", error);

    return res.status(500).json({
      EM: "Lỗi từ server",
      EC: -1,
      DT: null,
    });
  }
};

const handleBuyCourses = async (req, res) => {
  try {
    const { userID, courseIDs } = req.query;

    if (!userID || !Array.isArray(courseIDs) || courseIDs.length === 0) {
      return res.status(400).json({
        EM: "Thiếu userID hoặc courseIDs không hợp lệ trong request",
        EC: 1,
        DT: null,
      });
    }

    const result = await orderService.buyCourses(userID, courseIDs);

    return res.status(200).json(result); // Return the result from buyCourses
  } catch (error) {
    console.error("Error in handleBuyCourses:", error);

    return res.status(500).json({
      EM: "Lỗi từ server",
      EC: -1,
      DT: null,
    });
  }
};

export default {
  handleGetOrderByUserID,
  handleBuyCourse,
  handleBuyCourses,
};
