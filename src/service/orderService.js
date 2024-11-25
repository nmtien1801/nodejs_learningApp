"use strict";
const db = require("../models");

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await db.Orders.findAll({
      where: { userID: userId },
      include: [
        {
          model: db.OrderDetail,
          as: "OrderDetails",
          attributes: ["courseID", "date", "price"],
          include: [
            {
              model: db.Course,
              as: "Course",
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
              ],
              include: [
                {
                  model: db.Review,
                  attributes: ["review", "rating"],
                  as: "Review",
                },
                {
                  model: db.Lessons,
                  attributes: ["title"],
                  as: "Lesson",
                },
                {
                  model: db.UserFollow,
                  attributes: ["userID"],
                  as: "UserFollow",
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"],
                      as: "user",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Xử lý thêm dữ liệu cần thiết
    const ordersWithDetails = orders.map((order) => {
      const orderDetails = order.OrderDetails || [];

      const totalPrice = orderDetails.reduce(
        (sum, detail) => sum + detail.price,
        0
      );

      const totalCourses = orderDetails.length;

      const coursesWithRatings = orderDetails.map((detail) => {
        const course = detail.Course;
        const ratings = course.Review.map((review) => review.rating);
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : 0;

        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        return {
          ...course.toJSON(),
          averageRating,
          totalLessons,
        };
      });

      return {
        ...order.toJSON(),
        totalPrice,
        totalCourses,
        courses: coursesWithRatings,
      };
    });

    return {
      EM: "Lấy đơn hàng thành công",
      EC: 0,
      DT: ordersWithDetails,
    };
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo userID:", error);
    return {
      EM: "Không thể lấy đơn hàng. Vui lòng thử lại sau.",
      EC: -2,
      DT: null,
    };
  }
};

module.exports = {
  getOrdersByUserId,
};
