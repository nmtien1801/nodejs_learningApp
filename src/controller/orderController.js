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

export default {
  handleGetOrderByUserID,
};
