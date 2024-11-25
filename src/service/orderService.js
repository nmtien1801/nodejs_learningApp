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
                  as: "Review", // Bao gồm bài đánh giá
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

      // Tính tổng giá trị đơn hàng
      const totalPrice = orderDetails.reduce(
        (sum, detail) => sum + detail.price,
        0
      );

      const totalCourses = orderDetails.length;

      // Lặp qua từng khóa học trong OrderDetails và tính averageRating
      const coursesWithRatings = orderDetails.map((detail) => {
        const course = detail.Course;
        const ratings = course.Review.map((review) => review.rating).filter(
          Boolean
        ); // Lọc ra các giá trị rating hợp lệ
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : 0; // Tính trung bình nếu có đánh giá

        const totalLessons = course.Lesson ? course.Lesson.length : 0; // Tính số bài học

        // Trả về khóa học cùng với các thông tin đã tính
        return {
          ...course.toJSON(),
          averageRating, // Thêm averageRating vào dữ liệu khóa học
          totalLessons,
        };
      });

      return {
        ...order.toJSON(),
        totalPrice, // Tổng giá trị của đơn hàng
        totalCourses, // Tổng số khóa học trong đơn hàng
        courses: coursesWithRatings, // Thông tin khóa học đã tính toán averageRating
      };
    });

    return {
      EM: "Lấy đơn hàng thành công",
      EC: 0,
      DT: ordersWithDetails, // Trả về đơn hàng có thêm thông tin khóa học
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
    if (
      !userID ||
      (!Array.isArray(courseIDs) && typeof courseIDs !== "string")
    ) {
      throw new Error("userID hoặc courseIDs không hợp lệ");
    }

    // Nếu courseIDs là chuỗi, chuyển thành mảng
    if (typeof courseIDs === "string") {
      courseIDs = [courseIDs];
    }

    if (courseIDs.length === 0) {
      throw new Error("courseIDs không thể rỗng");
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
      total: 0, // Initialize total to 0
    });

    const orderDetails = [];
    let totalPrice = 0;

    // Duyệt qua từng khóa học
    for (let courseID of courseIDs) {
      const course = await db.Course.findByPk(courseID);
      if (!course) {
        return {
          EM: `Không tìm thấy khóa học với ID: ${courseID}`,
          EC: -1,
          DT: null,
        };
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

    // Cập nhật tổng tiền vào bảng Orders
    await newOrder.update({
      total: totalPrice, // Set the total price
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
