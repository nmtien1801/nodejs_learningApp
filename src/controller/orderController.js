import orderService from "../service/orderService";

const handleGetOrderByUserID = async (req, res) => {
  try {
    const { userID } = req.params; // Sử dụng destructuring để dễ đọc
    if (!userID) {
      return res.status(400).json({
        EM: "Thiếu userID trong request",
        EC: 1,
        DT: null,
      });
    }

    const data = await orderService.getOrdersByUserId(userID);
    console.log("Fetched orders for userID:", userID, "Data:", data);

    return res.status(200).json({
      EM: "Lấy danh sách khóa học thành công",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.error("Error in handleGetOrderByUserID:", error); // Log lỗi chi tiết

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
