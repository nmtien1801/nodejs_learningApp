import db from "../models/index"; // Import models from sequelize
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();
const { Op } = require("sequelize");

// Get cart by userID
const getCartByUserID = async (userID) => {
  try {
    // Lấy thông tin giỏ hàng của người dùng cùng các thông tin liên quan đến khóa học
    const cartItems = await db.Cart.findAll({
      where: {
        userID: userID,
      },
      include: [
        {
          model: db.Course,
          as: "course", // Sử dụng alias "course" định nghĩa trong association
          attributes: { exclude: ["createdAt", "updatedAt"] }, // Loại trừ các trường không cần thiết
          include: [
            {
              model: db.Review,
              attributes: ["review", "rating"],
              as: "Review", // Kết nối với bảng Review
            },
            {
              model: db.Lessons,
              attributes: ["title"],
              as: "Lesson", // Kết nối với bảng Lesson
            },
            {
              model: db.Orders,
              attributes: ["id", "total"],
              as: "Orders", // Kết nối với bảng Order
              through: {
                model: db.OrderDetail,
                attributes: ["price"], // Lấy giá từ bảng OrderDetail
              },
            },
            {
              model: db.UserFollow,
              attributes: ["userID"],
              as: "UserFollow",
              include: [
                {
                  model: db.User,
                  attributes: ["userName"],
                  as: "user", // Kết nối với bảng User
                },
              ],
            },
          ],
        },
      ],
    });

    // Tính trung bình rating cho từng khóa học trong giỏ hàng
    const cartWithCourseDetails = cartItems.map((cartItem) => {
      const course = cartItem.course;
      const ratings = course.Review.map((review) => review.rating);

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
        totalRating: ratings.length, // Thêm trường tổng số rating
        totalLessons, // Thêm trường tổng số bài giảng
      };
    });

    // Chỉ trả về mảng DT chứa các khóa học trong giỏ hàng
    return cartWithCourseDetails;
  } catch (error) {
    console.error("Error in getCartByUserID:", error);
    return [];
  }
};

// Add course to cart
const addCourseToCart = async (userID, courseID) => {
  try {
    // Kiểm tra xem userID và courseID có hợp lệ không
    if (!userID || !courseID) {
      throw new Error("userID or courseID is missing or invalid");
    }

    // Log giá trị userID và courseID để kiểm tra
    console.log(
      "Adding course to cart - userID:",
      userID,
      "courseID:",
      courseID
    );

    // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
    const existingCart = await db.Cart.findOne({
      where: {
        userID: userID,
        courseID: courseID, // Kiểm tra để tránh trùng lặp khóa học trong giỏ hàng
      },
    });

    if (existingCart) {
      // Nếu khóa học đã có trong giỏ hàng, ném lỗi
      throw new Error("The course is already in the cart");
    }

    // Nếu chưa có, thêm khóa học vào giỏ hàng
    const newCart = await db.Cart.create({
      userID: userID,
      courseID: courseID, // Thêm khóa học vào giỏ hàng
    });

    console.log("Course added successfully to cart:", newCart);

    return newCart; // Trả về kết quả
  } catch (error) {
    // Nếu có lỗi, log và ném lỗi ra ngoài
    console.error("Error in addCourseToCart:", error);
    throw error; // Ném lỗi để phía caller có thể xử lý
  }
};

// Remove course from cart
const deleteCourseFromCart = async (userID, courseID) => {
  const result = await db.Cart.destroy({
    where: {
      userID: userID,
      courseID: courseID,
    },
  });

  if (result === 0) {
    throw new Error("Course not found in the cart");
  }

  return result;
};

// Remove all courses from cart
const deleteAllCart = async (userID) => {
  return await db.Cart.destroy({
    where: {
      userID: userID,
    },
  });
};

// Calculate total price of the cart
const getTotalPrice = async (userID) => {
  const carts = await getCartByUserID(userID);
  let totalPrice = 0;

  // Iterate through all courses in the cart and calculate total
  carts.forEach((cart) => {
    if (cart.course && cart.course.price) {
      totalPrice += cart.course.price;
    }
  });

  return totalPrice;
};

module.exports = {
  getCartByUserID,
  addCourseToCart,
  deleteCourseFromCart,
  deleteAllCart,
  getTotalPrice,
};
