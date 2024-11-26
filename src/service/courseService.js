import db from "../models/index";
import bcrypt from "bcryptjs";
import { createJwt } from "../middleware/jwtAction";
import { includes } from "lodash";
import { raw } from "body-parser";
require("dotenv").config();
const { Op } = require("sequelize");

const findAllCourses = async () => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let courses = await db.Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
        // lấy ds lesson
        {
          model: db.Lessons,
          attributes: ["title"],
          as: "Lesson",
        },
        // lấy price trong orderDetail
        {
          model: db.Orders, // Bao gồm bảng Order qua bảng trung gian
          attributes: ["id", "total"],
          as: "Orders", // Khớp với as trong mối quan hệ belongsToMany
          through: {
            model: db.OrderDetail, // Chỉ định bảng trung gian
            attributes: ["price"], // Chỉ lấy giá
          },
        },
        // lấy ra teacher dạy trong userFollow
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
    });

    // Tính trung bình rating cho từng khóa học
    const coursesWithAverageRating = courses.map((course) => {
      // Lấy danh sách các rating của review cho khóa học
      const ratings = course.Review.map((review) => review.rating);

      // Tính trung bình của các rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

      // Tổng số bài giảng
      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      course.image = Buffer.from(course.image, "base64").toString("binary");

      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
        totalRating: ratings.length, // Thêm trường tổng số rating
        totalLessons, // Thêm trường tổng số bài giảng
      };
    });

    return {
      EM: "find all courses successfully",
      EC: 0,
      DT: coursesWithAverageRating,
    };
  } catch (error) {
    console.error("Error in findAllCourses:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseByID = async (id) => {
  try {
    let course = await db.Course.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
        // Lấy danh sách bài giảng
        {
          model: db.Lessons,
          attributes: ["title"],
          as: "Lesson",
        },
        // Lấy price trong orderDetail
        {
          model: db.Orders, // Bao gồm bảng Order qua bảng trung gian
          attributes: ["id", "total"],
          as: "Orders", // Khớp với as trong mối quan hệ belongsToMany
          through: {
            model: db.OrderDetail, // Chỉ định bảng trung gian
            attributes: ["price"], // Chỉ lấy giá
          },
        },
        // Lấy ra teacher dạy trong userFollow
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "UserFollow",
          include: [
            {
              model: db.User,
              attributes: ["userName", "title"],
              as: "user",
            },
          ],
        },
      ],
    });

    if (!course) {
      return {
        EM: "Course not found",
        EC: -1,
        DT: "",
      };
    }

    // Tính trung bình rating và tổng số bài giảng
    const ratings = course.Review.map((review) => review.rating);
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

    const totalLessons = course.Lesson ? course.Lesson.length : 0;

    const courseWithDetails = {
      ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
      averageRating, // Thêm trường trung bình rating
      totalRating: ratings.length, // Thêm trường tổng số rating
      totalLessons, // Thêm trường tổng số bài giảng
    };

    return {
      EM: "findCourseByID is created successfully",
      EC: 0,
      DT: courseWithDetails,
    };
  } catch (error) {
    console.error("Error in findCourseByID:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findPopularCourses = async () => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let courses = await db.Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
        // lấy ds lesson
        {
          model: db.Lessons,
          attributes: ["title"],
          as: "Lesson",
        },
        // lấy price trong orderDetail
        {
          model: db.Orders, // Bao gồm bảng Order qua bảng trung gian
          attributes: ["id", "total"],
          as: "Orders", // Khớp với as trong mối quan hệ belongsToMany
          through: {
            model: db.OrderDetail, // Chỉ định bảng trung gian
            attributes: ["price"], // Chỉ lấy giá
          },
        },
        // lấy ra teacher dạy trong userFollow
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
    });

    // Tính trung bình rating cho từng khóa học
    const coursesWithAverageRating = courses.map((course) => {
      // Lấy danh sách các rating của review cho khóa học
      const ratings = course.Review.map((review) => review.rating);

      // Tính trung bình của các rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

      // Lấy thông tin giá (price) từ OrderDetail
      const price = course.Orders[0]?.OrderDetail?.price || null; // Nếu không có sẽ trả về null

      // Lấy tên giảng viên (userName) từ UserFollow
      const instructor = course.UserFollow[0]?.user?.userName || "Unknown"; // Nếu không có sẽ trả về "Unknown"

      // Tổng số bài giảng
      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      course.image = Buffer.from(course.image, "base64").toString("binary");

      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
        totalRating: ratings.length, // Thêm trường tổng số rating
        totalLessons, // Thêm trường tổng số bài giảng
        price, // Thêm trường giá khóa học
        instructor, // Thêm trường tên giảng viên
      };
    });

    // Sắp xếp các khóa học theo totalLessons giảm dần
    coursesWithAverageRating.sort((a, b) => b.totalLessons - a.totalLessons);

    return {
      EM: "find popular courses successfully",
      EC: 0,
      DT: coursesWithAverageRating.sort(
        (a, b) => b.totalLessons - a.totalLessons
      ),
    };
  } catch (error) {
    console.error("Error in findPopularCourses:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseSimilar = async (id) => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let courses = await db.Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
        // lấy ds lesson
        {
          model: db.Lessons,
          attributes: ["title"],
          as: "Lesson",
        },
        // lấy price trong orderDetail
        {
          model: db.Orders, // Bao gồm bảng Order qua bảng trung gian
          attributes: ["id", "total"],
          as: "Orders", // Khớp với as trong mối quan hệ belongsToMany
          through: {
            model: db.OrderDetail, // Chỉ định bảng trung gian
            attributes: ["price"], // Chỉ lấy giá
          },
        },
        // lấy ra teacher dạy trong userFollow
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "UserFollow",
          include: [
            {
              model: db.User,
              attributes: ["userName"],
              as: "user",
              where: { roleID: 1 }, // chỉ user có role = 1 (giảng viên)
            },
          ],
        },
      ],
    });

    // Tính trung bình rating cho từng khóa học
    const coursesWithAverageRating = courses.map((course) => {
      // Lấy danh sách các rating của review cho khóa học
      const ratings = course.Review.map((review) => review.rating);

      // Tính trung bình của các rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

      // Tổng số bài giảng
      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      course.image = Buffer.from(course.image, "base64").toString("binary");

      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
        totalRating: ratings.length, // Thêm trường tổng số rating
        totalLessons, // Thêm trường tổng số bài giảng
      };
    });

    return {
      EM: "findCourseSimilar successfully",
      EC: 0,
      DT: coursesWithAverageRating.sort(
        (a, b) => b.totalLessons - a.totalLessons
      ),
    };
  } catch (error) {
    console.error("Error in findCourseSimilar:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const addNewCourse = async (courseData) => {
  try {
    // Tạo khóa học mới
    let newCourse = await db.Course.create({
      name: courseData.name,
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      image: courseData.image,
      descProject: courseData.descriptionProject,
      state: 0, // Chưa bắt đầu
      categoryID: courseData.categoryID,
    });

    // tạo mới user follow để kết nối vói id của user và course
    let newUserFollow = await db.UserFollow.create({
      userID: courseData.userID,
      courseID: newCourse.id,
    });

    return {
      EM: "addNewCourse successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.error("Error in addNewCourse service:", error);
    return {
      EM: "err addNewCourse in the service",
      EC: -2,
      DT: "",
    };
  }
};

const searchCourse = async (keyword) => {
  try {
    const courses = await db.Course.findAll({
      where: {
        name: {
          [Op.substring]: keyword,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
          model: db.Orders,
          attributes: ["id", "total"],
          as: "Orders",
          through: {
            model: db.OrderDetail,
            attributes: ["price"],
          },
        },
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "UserFollow",
          include: [
            {
              model: db.User,
              attributes: ["userName", "title"],
              as: "user",
            },
          ],
        },
      ],
    });

    if (!courses || courses.length === 0) {
      return {
        EM: "No courses found matching the keyword",
        EC: -1,
        DT: [],
      };
    }

    const processedCourses = courses.map((course) => {
      const courseJSON = course.toJSON();

      const ratings = courseJSON.Review?.map((review) => review.rating) || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

      const totalLessons = courseJSON.Lesson?.length || 0;

      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      courseJSON.image = Buffer.from(courseJSON.image, "base64").toString("binary");

      return {
        ...courseJSON,
        averageRating,
        totalRating: ratings.length,
        totalLessons,
      };
    });

    return {
      EM: "Courses retrieved successfully",
      EC: 0,
      DT: processedCourses,
    };
  } catch (error) {
    console.error("Error in searchCourse:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const updateCourse = async (courseData) => {
  try {
    // Cập nhật thông tin khóa học
    let updatedCourse = await db.Course.update(
      {
        name: courseData.name,
        title: courseData.title,
        description: courseData.description,
        image: courseData.image,
        descProject: courseData.descriptionProject,
        state: 0, // Chưa bắt đầu
        categoryID: courseData.categoryID,
      },
      {
        where: {
          id: courseData.id,
        },
      }
    );

    return {
      EM: "updateCourse successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.error("Error in updateCourse service:", error);
    return {
      EM: "err updateCourse in the service",
      EC: -2,
      DT: "",
    };
  }
};

const deleteCourse = async (id) => {
  try {
    // Xóa khóa học
    let deletedCourse = await db.Course.destroy({
      where: {
        id: id,
      },
    });

    // xóa luôn user follow
    let deletedUserFollow = await db.UserFollow.destroy({
      where: {
        courseID: id,
      },
    });

    return {
      EM: "deleteCourse successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.error("Error in deleteCourse service:", error);
    return {
      EM: "err deleteCourse in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findInspireCourses = async () => {
  try {
    // Lấy danh sách khóa học và thông tin review, rating
    let courses = await db.Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Không lấy trường trong exclude
      include: [
        {
          model: db.Review,
          attributes: ["review", "rating"],
          as: "Review", // Kết nối với bảng Review
        },
        // lấy ds lesson
        {
          model: db.Lessons,
          attributes: ["title"],
          as: "Lesson",
        },
        // lấy price trong orderDetail
        {
          model: db.Orders, // Bao gồm bảng Order qua bảng trung gian
          attributes: ["id", "total"],
          as: "Orders", // Khớp với as trong mối quan hệ belongsToMany
          through: {
            model: db.OrderDetail, // Chỉ định bảng trung gian
            attributes: ["price"], // Chỉ lấy giá
          },
        },
        // lấy ra teacher dạy trong userFollow
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
    });

    // Tính trung bình rating cho từng khóa học
    const coursesWithAverageRating = courses.map((course) => {
      // Lấy danh sách các rating của review cho khóa học
      const ratings = course.Review.map((review) => review.rating);

      // Tính trung bình của các rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0; // Nếu không có rating nào thì để giá trị mặc định là 0

      // Tổng số bài giảng
      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      // ảnh
      // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
      course.image = Buffer.from(course.image, "base64").toString("binary");
      
      return {
        ...course.toJSON(), // Chuyển đổi khóa học thành đối tượng JSON
        averageRating, // Thêm trường trung bình rating
        totalRating: ratings.length, // Thêm trường tổng số rating
        totalLessons, // Thêm trường tổng số bài giảng
      };
    });

    return {
      EM: "find inspire courses successfully",
      EC: 0,
      DT: coursesWithAverageRating.sort(
        (a, b) => b.totalRating - a.totalRating
      ),
    };
  } catch (error) {
    console.error("Error in findInspireCourses:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const findCourseByCategory = async (categoryID) => {
  try {
    let courses = await db.Course.findAll({
      where: {
        categoryID: categoryID,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
          model: db.Orders,
          attributes: ["id", "total"],
          as: "Orders",
          through: {
            model: db.OrderDetail,
            attributes: ["price"],
          },
        },
        {
          model: db.UserFollow,
          attributes: ["userID"],
          as: "UserFollow",
          include: [
            {
              model: db.User,
              attributes: ["userName", "title"],
              as: "user",
            },
          ],
        },
      ],
    });

    if (!courses || courses.length === 0) {
      return {
        EM: "No courses found in this category",
        EC: -1,
        DT: [],
      };
    }

    const processedCourses = courses.map((course) => {
      const courseJSON = course.toJSON();

      const ratings = courseJSON.Review?.map((review) => review.rating) || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

      const totalLessons = courseJSON.Lesson?.length || 0;

      return {
        ...courseJSON,
        averageRating,
        totalRating: ratings.length,
        totalLessons,
      };
    });

    return {
      EM: "Courses retrieved successfully",
      EC: 0,
      DT: processedCourses,
    };
  } catch (error) {
    console.error("Error in findCourseByCategory:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findAllCourses,
  findCourseByID,
  findPopularCourses,
  findCourseSimilar,
  addNewCourse,
  searchCourse,
  updateCourse,
  deleteCourse,
  findInspireCourses,
  findCourseByCategory,
};
