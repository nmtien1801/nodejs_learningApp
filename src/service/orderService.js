"use strict";
const db = require("../models");

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await db.Orders.findAll({
      where: { userID: userId },
      include: [
        {
          model: db.OrderDetail,
          as: "OrderDetails", // Alias cho mối quan hệ giữa Orders và OrderDetail
          attributes: ["courseID", "date", "price"], // Lựa chọn các trường cần thiết
          include: [
            {
              model: db.Course,
              as: "Course", // Alias cho mối quan hệ giữa OrderDetail và Course
              attributes: [
                "name",
                "title",
                "description",
                "image",
                "descProject",
                "categoryID",
                "lessonID",
                "state",
                "price",
              ], // Lựa chọn các thuộc tính của Course
            },
          ],
        },
      ],
    });

    return orders;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo userID:", error);
    throw new Error("Không thể lấy đơn hàng. Vui lòng thử lại sau.");
  }
};

module.exports = {
  getOrdersByUserId,
};
