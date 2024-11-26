import db from "../models/index";
import bcrypt from "bcryptjs";
import { at } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();

const getTopTeacher = async () => {
  try {
    // Truy vấn giáo viên
    const teachers = await db.User.findAll({
      where: { roleID: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "password"] }, // Loại bỏ các trường không cần thiết
      include: [
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            {
              model: db.Course,
              attributes: ["id", "name", "description"],
              as: "course",
              include: [
                {
                  model: db.Review,
                  attributes: ["rating"],
                  as: "Review", // Đảm bảo 'as' khớp với định nghĩa trong model
                },
                // Lấy danh sách lesson
                {
                  model: db.Lessons,
                  attributes: ["title"],
                  as: "Lesson",
                },
              ],
            },
          ],
        },
      ],
    });

    // Tính trung bình rating và tổng số bài giảng cho mỗi giáo viên
    const teachersWithAverageRatingAndLessons = teachers.map((teacher) => {
      const allRatings = teacher.userFollows
        .flatMap((userFollow) =>
          userFollow.course && userFollow.course.Review
            ? userFollow.course.Review.map((review) => review.rating)
            : []
        )
        .filter((rating) => rating !== undefined); // Loại bỏ giá trị null hoặc undefined

      // Tính trung bình rating và làm tròn đến 2 chữ số
      const averageRating =
        allRatings.length > 0
          ? (
              allRatings.reduce((sum, rating) => sum + rating, 0) /
              allRatings.length
            ).toFixed(2) // Làm tròn đến 2 chữ số
          : "0.00"; // Nếu không có rating nào thì trả về '0.00'

      // Tính tổng số bài giảng và làm tròn
      const totalLessons = Math.round(
        teacher.userFollows.flatMap((userFollow) =>
          userFollow.course ? userFollow.course.Lesson : []
        ).length
      ); // Làm tròn tổng số bài giảng

      return {
        ...teacher.toJSON(), // Chuyển đối tượng Sequelize thành JSON
        averageRating, // Thêm trường trung bình rating
        totalLessons, // Thêm trường tổng số bài giảng đã làm tròn
      };
    });

    return {
      EM: "Get reviews and average rating successfully",
      EC: 0,
      DT: teachersWithAverageRatingAndLessons,
    };
  } catch (error) {
    console.error("Error in getTopTeacher:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const getAllCourseUser = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
      include: [
        // user follow
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            // course
            {
              model: db.Course,
              attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
              as: "course",
              // review
              include: [
                {
                  model: db.Review,
                  attributes: ["id", "rating", "review", "time"],
                  as: "Review",
                  // user
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"],
                      as: "user",
                    },
                  ],
                },
                // category
                {
                  model: db.Category,
                  attributes: ["name"],
                  as: "Category",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);
      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      if (courses && courses.length > 0) {
        courses.map((item) => {
          if (item.image) {
            item.image = Buffer.from(item.image, "base64").toString("binary");
          }
        });
      }
      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: courses,
      };
    }
  } catch (error) {
    console.error("Error in getAllCourseUser service:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseUserState1 = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
      include: [
        // user follow
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            // course
            {
              model: db.Course,
              where: {
                state: 1,
              },
              attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
              as: "course",
            },
          ],
        },
      ],
    });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);
      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: courses,
      };
    }
  } catch (error) {
    console.error("Error in findCourseUserState1 service:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseUserState2 = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
      include: [
        // user follow
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            // course
            {
              model: db.Course,
              where: {
                state: 2,
              },
              attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
              as: "course",
            },
          ],
        },
      ],
    });

    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);
      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: courses,
      };
    }
  } catch (error) {
    console.error("Error in findCourseUserState2 service:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  getTopTeacher,
  getAllCourseUser,
  findCourseUserState1,
  findCourseUserState2,
};
