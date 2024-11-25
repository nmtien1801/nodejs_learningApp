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
              include: [
                {
                  model: db.Review,
                  attributes: ["review", "rating"], // Lấy thông tin review
                  as: "Review", // Alias cho mối quan hệ giữa Course và Review
                },
                {
                  model: db.Lessons,
                  attributes: ["title"], // Lấy thông tin bài học
                  as: "Lesson", // Alias cho mối quan hệ giữa Course và Lesson
                },
                {
                  model: db.UserFollow,
                  attributes: ["userID"], // Lấy thông tin người theo dõi
                  as: "UserFollow",
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"], // Lấy tên người dùng
                      as: "user", // Alias cho mối quan hệ giữa UserFollow và User
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Tính toán thông tin bổ sung cho các đơn hàng
    const ordersWithDetails = orders.map((order) => {
      // Lấy danh sách các chi tiết đơn hàng
      const orderDetails = order.OrderDetails || [];

      // Tính tổng số tiền từ các chi tiết đơn hàng
      const totalPrice = orderDetails.reduce(
        (sum, detail) => sum + detail.price,
        0
      );

      // Tính số lượng khóa học từ chi tiết đơn hàng
      const totalCourses = orderDetails.length;

      // Tính trung bình rating và tổng số bài giảng cho các khóa học
      const coursesWithRatings = orderDetails.map((detail) => {
        const course = detail.Course;
        const ratings = course.Review.map((review) => review.rating);
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : 0; // Giá trị mặc định nếu không có rating

        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        return {
          ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
          averageRating, // Thêm trường trung bình rating
          totalLessons, // Thêm tổng số bài giảng
        };
      });

      return {
        ...order.toJSON(), // Chuyển đổi đơn hàng thành đối tượng JSON
        totalPrice, // Thêm tổng số tiền
        totalCourses, // Thêm tổng số khóa học
        courses: coursesWithRatings, // Thêm thông tin khóa học với rating
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
      DT: "",
    };
  }
};

module.exports = {
  getOrdersByUserId,
};
