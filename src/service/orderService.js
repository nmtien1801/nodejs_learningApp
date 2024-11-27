"use strict";
import db from "../models/index"; // Import models from sequelize
require("dotenv").config();
const { Op } = require("sequelize");
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
                "image", // Blob image field
                "descProject",
                "categoryID",
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

    // Kiểm tra nếu không có đơn hàng
    if (orders.length === 0) {
      return {
        EM: `Không tìm thấy đơn hàng cho userID ${userId}`,
        EC: 0,
        DT: [],
      };
    }

    // Xử lý đơn hàng và các chi tiết liên quan
    const ordersWithDetails = orders.map((order) => {
      const orderDetails = order.OrderDetails || [];
      const totalPrice = orderDetails.reduce(
        (sum, detail) => sum + detail.price,
        0
      );
      const totalCourses = orderDetails.length;

      const coursesWithRatings = orderDetails.map((detail) => {
        const course = detail.Course;

        // Xử lý rating
        const ratings = course.Review.map((review) => review.rating).filter(
          Boolean
        );
        const averageRating = ratings.length
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

        // Tổng số bài học
        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        // Chuyển đổi ảnh từ blob sang base64
        const base64Image = course.image
          ? Buffer.from(course.image, "base64").toString("binary")
          : null;

        return {
          ...course.toJSON(),
          image: base64Image, // Gắn ảnh đã chuyển đổi
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
    console.error("Error in getOrdersByUserId:", error);
    return {
      EM: "Không thể lấy đơn hàng. Vui lòng thử lại sau.",
      EC: -2,
      DT: null,
    };
  }
};

module.exports = { getOrdersByUserId };

const buyCourse = async (userID, courseID) => {
  try {
    // Kiểm tra xem userId và courseId có hợp lệ không
    if (!userID || !courseID) {
      throw new Error("userId hoặc courseId không hợp lệ");
    }

    // Log giá trị userID và courseID để kiểm tra
    console.log(
      "Adding course to cart - userID:",
      userID,
      "courseID:",
      courseID
    );

    // Tìm khóa học theo courseId
    const course = await db.Course.findByPk(courseID);

    // Nếu không tìm thấy khóa học
    if (!course) {
      return {
        EM: "Không tìm thấy khóa học",
        EC: -1,
        DT: null,
      };
    }

    // Tạo đơn hàng mới
    const newOrder = await db.Orders.create({
      userID: userID,
    });

    // Thêm chi tiết đơn hàng
    await db.OrderDetail.create({
      orderID: newOrder.id,
      courseID: courseID,
      price: course.price,
    });

    // Trả về kết quả mà không lồng quá nhiều object
    return {
      EM: "Mua khóa học thành công",
      EC: 0,
      DT: newOrder, // Trả về đơn hàng trực tiếp
    };
  } catch (error) {
    console.error("Lỗi khi mua khóa học:", error);
    return {
      EM: "Không thể mua khóa học. Vui lòng thử lại sau.",
      EC: -2,
      DT: null,
    };
  }
};

const buyCourses = async (userID, courseIDs) => {
  try {
    // Đảm bảo courseIDs là mảng
    if (!userID || !Array.isArray(courseIDs) || courseIDs.length === 0) {
      throw new Error("userID hoặc courseIDs không hợp lệ");
    }

    // Nếu courseIDs là chuỗi, chuyển thành mảng
    if (typeof courseIDs === "string") {
      courseIDs = [courseIDs];
    }

    console.log(
      "Adding courses to cart - userID:",
      userID,
      "courseIDs:",
      courseIDs
    );

    // Tạo đơn hàng mới
    const newOrder = await db.Orders.create({
      userID: userID,
      total: 0, // Khởi tạo tổng là 0
    });

    const orderDetails = [];
    let totalPrice = 0;
    let failedCourses = [];

    // Duyệt qua từng khóa học
    for (let courseID of courseIDs) {
      const course = await db.Course.findByPk(courseID);
      if (!course) {
        failedCourses.push(courseID); // Lưu lại khóa học không tồn tại
        continue; // Tiếp tục với khóa học tiếp theo
      }

      // Thêm chi tiết đơn hàng cho mỗi khóa học
      const orderDetail = await db.OrderDetail.create({
        orderID: newOrder.id,
        courseID: courseID,
        price: course.price,
      });
      orderDetails.push(orderDetail);
      totalPrice += course.price;
    }

    // Nếu có khóa học không hợp lệ
    if (failedCourses.length > 0) {
      return {
        EM: `Không tìm thấy khóa học với ID: ${failedCourses.join(", ")}`,
        EC: -1,
        DT: null,
      };
    }

    // Cập nhật tổng tiền vào bảng Orders
    await newOrder.update({
      total: totalPrice, // Cập nhật tổng tiền
    });

    // Trả về kết quả với đơn hàng và chi tiết
    return {
      EM: "Mua khóa học thành công",
      EC: 0,
      DT: {
        order: newOrder,
        orderDetails: orderDetails,
        totalPrice: totalPrice,
      },
    };
  } catch (error) {
    console.error("Lỗi khi mua khóa học:", error);
    return {
      EM: "Không thể mua khóa học. Vui lòng thử lại sau.",
      EC: -2,
      DT: null,
    };
  }
};
module.exports = {
  getOrdersByUserId,
  buyCourse,
  buyCourses,
};
