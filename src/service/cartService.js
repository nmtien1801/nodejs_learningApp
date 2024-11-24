import db from "../models/index"; // Import các model từ sequelize
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();
const { Op } = require("sequelize");

// Get giỏ hàng theo userID
const getCartByUserID = async (userID) => {
  return await db.Cart.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.Course,
        as: "course", // Dùng alias "course" đã định nghĩa trong association
      },
    ],
  });
};

// Thêm khóa học vào giỏ hàng
const addCourseToCart = async (userID, courseID) => {
  // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
  const existingCart = await db.Cart.findOne({
    where: {
      userID: userID,
      courseID: courseID, // Thêm check để tránh thêm trùng khóa học vào giỏ
    },
  });

  if (existingCart) {
    throw new Error("Khóa học đã có trong giỏ hàng");
  }

  return await db.Cart.create({
    userID: userID,
    courseID: courseID, // Gán khóa học vào giỏ hàng
  });
};

// Xóa khóa học khỏi giỏ hàng
const deleteCourseFromCart = async (userID, courseID) => {
  const result = await db.Cart.destroy({
    where: {
      userID: userID,
      courseID: courseID,
    },
  });

  if (result === 0) {
    throw new Error("Không tìm thấy khóa học trong giỏ hàng");
  }

  return result;
};

// Xóa toàn bộ giỏ hàng
const deleteAllCart = async (userID) => {
  return await db.Cart.destroy({
    where: {
      userID: userID,
    },
  });
};

// Tính tổng tiền giỏ hàng
const getTotalPrice = async (userID) => {
  const carts = await getCartByUserID(userID);
  let totalPrice = 0;

  // Duyệt qua tất cả khóa học trong giỏ hàng và tính tổng
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
