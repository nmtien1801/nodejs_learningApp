import db from "../models/index";
import { Op } from "sequelize";

const findCourseByTeacherID_Categories = async (teacherID) => {
  try {
    // Fetch courses followed by the teacher
    let courses = await db.UserFollow.findAll({
      where: { userID: teacherID },
      attributes: ["courseID"],
    });

    // Extract courseIDs
    let courseIDs = courses.map((course) => course.courseID);
    console.log("courseIDs:", courseIDs);

    // If no courses found, return a response
    if (courseIDs.length === 0) {
      return {
        EM: "No courses found for this teacher",
        EC: 1,
        DT: [],
      };
    }

    // Fetch course details along with categories
    let courseDetails = await db.Course.findAll({
      where: { id: { [Op.in]: courseIDs } },
      include: [
        {
          model: db.Category,
          as: "Category", // Alias trùng với alias trong mô hình
          attributes: ["name"],
        },
      ],
    });

     // ảnh
    // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
    if (courseDetails && courseDetails.length > 0) {
      courseDetails.map((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, "base64").toString("binary"); 
        }
      });
    }

    return {
      EM: "find teacher successfully",
      EC: 0,
      DT: courseDetails,
    };
  } catch (error) {
    console.error("Error in findCourseByTeacherID_Categories:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

const getCourseOfUser = async (userID) => {
  try {
    const userCourses = await db.UserFollow.findAll({
      where: { userID: userID },
      attributes: ["id", "userID"],
      include: [
        {
          model: db.Course,
          attributes: ["id", "name", "title", "state", "image"],
          as: "course",
          include: [
            {
              model: db.Review,
              attributes: ["rating"],
              as: "Review", // Alias phải khớp với định nghĩa model
            },
            {
              model: db.Lessons,
              attributes: ["title"],
              as: "Lesson", // Alias phải khớp với định nghĩa model
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
        },
      ],
    });

    if (!userCourses || userCourses.length === 0) {
      return {
        EM: "No courses found for this user",
        EC: 1,
        DT: [],
      };
    }

    const coursesWithDetails = userCourses.map((userCourse) => {
      const course = userCourse.course;

      // Tính trung bình rating
      const allRatings = course.Review
        ? course.Review.map((review) => review.rating)
        : [];
      const averageRating =
        allRatings.length > 0
          ? (
              allRatings.reduce((sum, rating) => sum + rating, 0) /
              allRatings.length
            ).toFixed(2)
          : "0.00";

      // Tổng số bài giảng
      const totalLessons = course.Lesson ? course.Lesson.length : 0;

      // tổng số Trạng thái khóa học
      const isState1 = course.state === 1 ? 1 : 0; // Đang học
      const isState2 = course.state === 2 ? 1 : 0; // Đã hoàn thành

        // ảnh
        // chuyển từ blop lưu dưới DB -> base64 để hiển thị ảnh FE
        course.image = Buffer.from(course.image, "base64").toString("binary");
      return {
        userID: userCourse.userID,
        courseID: course.id,
        courseName: course.name,
        courseTitle: course.title,
        courseImage: course.image,
        averageRating: averageRating,
        price:
          course.Orders.length > 0 ? course.Orders[0].OrderDetail.price : 0,
        teacherName: course.UserFollow.length > 0 ? course.UserFollow[0].user.userName : "",
        totalLessons: totalLessons,
        state: course.state,
        isState1: isState1,
        isState2: isState2,
      };
    });

    // Tổng hợp toàn bộ dữ liệu
    const totalCourses = coursesWithDetails.length;
    const totalCoursesState1 = coursesWithDetails.filter(
      (c) => c.isState1
    ).length;
    const totalCoursesState2 = coursesWithDetails.filter(
      (c) => c.isState2
    ).length;

    return {
      EM: "Find courses of user successfully",
      EC: 0,
      DT: {
        totalCourses,
        totalCoursesState1,
        totalCoursesState2,
        courses: coursesWithDetails,
      },
    };
  } catch (error) {
    console.error("Error in getCourseOfUser:", error);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  findCourseByTeacherID_Categories,
  getCourseOfUser,
};
