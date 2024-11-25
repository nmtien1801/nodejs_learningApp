import db from "../models/index"; // Import models from sequelize
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();
const { Op } = require("sequelize");

// Get cart by userID
const getCartByUserID = async (userID) => {
  return await db.Cart.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.Course,
        as: "course", // Use alias "course" defined in the association
      },
    ],
  });
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

//ok
