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
    // Lấy giỏ hàng của người dùng và thông tin liên quan đến khóa học, review, lesson, order, và userFollow
    const cartItems = await db.Cart.findAll({
      where: {
        userID: userID,
      },
      include: [
        {
          model: db.Course,
          as: "course", // Đảm bảo alias "course" đã được khai báo trong association
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: db.Review,
              attributes: ["review", "rating"],
              as: "Review", // Alias cho bảng Review
            },
            {
              model: db.Lessons,
              attributes: ["title"],
              as: "Lesson", // Alias cho bảng Lessons
            },
            {
              model: db.Orders,
              attributes: ["id", "total"],
              as: "Orders",
              through: {
                model: db.OrderDetail,
                attributes: ["price"], // Thuộc tính price trong OrderDetail
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
                  as: "user", // Alias cho User
                },
              ],
            },
          ],
        },
      ],
    });

    // Nếu không có sản phẩm trong giỏ hàng
    if (!cartItems || cartItems.length === 0) {
      return []; // Trả về giỏ hàng rỗng nếu không có kết quả
    }

    // Xử lý dữ liệu giỏ hàng
    const processedCartItems = cartItems.map((cartItem) => {
      const courseJSON = cartItem.course.toJSON();

      // Tính điểm đánh giá trung bình
      const ratings = courseJSON.Review?.map((review) => review.rating) || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

      // Tính tổng số bài học
      const totalLessons = courseJSON.Lesson?.length || 0;

      // Lấy giá từ OrderDetail qua Orders
      const price =
        courseJSON.Orders?.[0]?.OrderDetail?.price || "Price not available"; // Kiểm tra sự tồn tại của price

      // Trả về dữ liệu đã được xử lý
      return {
        id: courseJSON.id,
        name: courseJSON.name,
        title: courseJSON.title,
        description: courseJSON.description,
        image: courseJSON.image,
        averageRating,
        totalRating: ratings.length,
        totalLessons,
        userName:
          courseJSON.UserFollow?.[0]?.user?.userName ||
          "Instructor not available", // Nếu không có tên người dạy
        price: price, // Trả về giá
      };
    });

    return processedCartItems; // Trả về danh sách các sản phẩm trong giỏ hàng
  } catch (error) {
    console.error("Error in getCartByUserID:", error);
    return []; // Trả về mảng rỗng khi có lỗi
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

// Xóa nhiều mục khỏi giỏ hàng dựa trên danh sách cartIDs
const deleteSelectedCartItems = async (cartIDs) => {
  return await db.Cart.destroy({
    where: {
      id: cartIDs, // Xóa dựa trên mảng `cartIDs`
    },
  });
};

module.exports = {
  getCartByUserID,
  addCourseToCart,
  deleteSelectedCartItems,
};

//ok
