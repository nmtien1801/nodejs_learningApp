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
    // Fetch user and associated courses
    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            {
              model: db.Course,
              as: "course",
              include: [
                {
                  model: db.Review,
                  attributes: ["review", "rating"],
                  as: "Review", // Connect to Review model
                  // user
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"],
                      as: "user",
                    },
                  ],
                  
                },
                {
                  model: db.Lessons,
                  attributes: ["title"],
                  as: "Lesson", // Connect to Lessons model
                },
                {
                  model: db.Orders,
                  attributes: ["id", "total"],
                  as: "Orders",
                  through: {
                    model: db.OrderDetail,
                    attributes: ["price"], // Price in OrderDetail
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
                      as: "user",
                    },
                  ],
                },
                // category
                {
                  model: db.Category,
                  attributes: ["name"],
                  as: "Category",
                }
              ],
            },
          ],
        },
      ],
    });

    // Check if user exists
    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);

      // Process each course to calculate average rating, total rating, and total lessons
      const coursesWithAverageRating = courses.map((course) => {
        // Get ratings from reviews for each course
        const ratings = course.Review.map((review) => review.rating);

        // Calculate average rating
        const averageRating = ratings.length
          ? (
              ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            ).toFixed(1)
          : 0; // Default to 0 if no reviews

        // Calculate total number of lessons
        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        // ảnh
        // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
        course.image = Buffer.from(course.image, "base64").toString("binary");

        // Add new fields to the course object
        return {
          ...course.toJSON(),
          averageRating: parseFloat(averageRating), // Convert to number
          totalRating: ratings.length, // Total number of ratings
          totalLessons, // Total number of lessons
        };
      });

      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: coursesWithAverageRating,
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
      where: { id: userId },
      include: [
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            {
              model: db.Course,
              where: {
                state: 1, // Only courses that are "ON GOING"
              },
              attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude unnecessary fields
              as: "course",
              include: [
                // Include Reviews to calculate total ratings and average rating
                {
                  model: db.Review,
                  attributes: ["review", "rating"],
                  as: "Review", // Connection to the Review model
                },
                // Include Lessons to count the total lessons
                {
                  model: db.Lessons,
                  attributes: ["title"],
                  as: "Lesson", // Connection to Lessons model
                },
                // Include Orders and prices through OrderDetail for more details
                {
                  model: db.Orders,
                  attributes: ["id", "total"],
                  as: "Orders",
                  through: {
                    model: db.OrderDetail,
                    attributes: ["price"], // Include price in OrderDetail
                  },
                },
                // Include UserFollow to get user info
                {
                  model: db.UserFollow,
                  attributes: ["userID"],
                  as: "UserFollow",
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"],
                      as: "user", // Get userName from User model
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Check if user exists
    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);

      // Process each course to calculate average rating, total rating, and total lessons
      const coursesWithDetails = courses.map((course) => {
        // Get ratings from reviews for each course
        const ratings = course.Review.map((review) => review.rating);

        // Calculate average rating
        const averageRating = ratings.length
          ? (
              ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            ).toFixed(1)
          : 0; // Default to 0 if no reviews

        // Calculate total number of lessons
        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        // ảnh
        // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
        course.image = Buffer.from(course.image, "base64").toString("binary");

        return {
          ...course.toJSON(),
          averageRating: parseFloat(averageRating), // Convert to number
          totalRating: ratings.length, // Total number of ratings
          totalLessons, // Total number of lessons
        };
      });

      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: coursesWithDetails,
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
      where: { id: userId },
      include: [
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "userFollows",
          include: [
            {
              model: db.Course,
              where: {
                state: 2, // Only courses that are "COMPLETED"
              },
              attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude unnecessary fields
              as: "course",
              include: [
                // Include Reviews to calculate total ratings and average rating
                {
                  model: db.Review,
                  attributes: ["review", "rating"],
                  as: "Review", // Connection to the Review model
                },
                // Include Lessons to count the total lessons
                {
                  model: db.Lessons,
                  attributes: ["title"],
                  as: "Lesson", // Connection to Lessons model
                },
                // Include Orders and prices through OrderDetail for more details
                {
                  model: db.Orders,
                  attributes: ["id", "total"],
                  as: "Orders",
                  through: {
                    model: db.OrderDetail,
                    attributes: ["price"], // Include price in OrderDetail
                  },
                },
                // Include UserFollow to get user info
                {
                  model: db.UserFollow,
                  attributes: ["userID"],
                  as: "UserFollow",
                  include: [
                    {
                      model: db.User,
                      attributes: ["userName"],
                      as: "user", // Get userName from User model
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Check if user exists
    if (!user) {
      return {
        EM: "User not found",
        EC: 1,
        DT: [],
      };
    } else {
      const courses = user.userFollows.map((userFollow) => userFollow.course);

      // Process each course to calculate average rating, total rating, and total lessons
      const coursesWithDetails = courses.map((course) => {
        // Get ratings from reviews for each course
        const ratings = course.Review.map((review) => review.rating);

        // Calculate average rating
        const averageRating = ratings.length
          ? (
              ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            ).toFixed(1)
          : 0; // Default to 0 if no reviews

        // Calculate total number of lessons
        const totalLessons = course.Lesson ? course.Lesson.length : 0;

        // ảnh
        // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
        course.image = Buffer.from(course.image, "base64").toString("binary");

        // Add new fields to the course object
        return {
          ...course.toJSON(),
          averageRating: parseFloat(averageRating), // Convert to number
          totalRating: ratings.length, // Total number of ratings
          totalLessons, // Total number of lessons
        };
      });

      return {
        EM: "Get all courses of user successfully",
        EC: 0,
        DT: coursesWithDetails,
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
