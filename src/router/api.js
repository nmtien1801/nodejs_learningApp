import express from "express";
import apiController from "../controller/apiController";
import courseController from "../controller/courseController";
import reviewController from "../controller/reviewController";
import teacherController from "../controller/teacherController";
import userFlowController from "../controller/userFlowController";
import userController from "../controller/userController";
import lessonController from "../controller/lessonController";
import projectController from "../controller/projectController";
import cartController from "../controller/cartController";
import orderController from "../controller/orderController";

const router = express.Router(); // bằng app = express();
/**
 *
 * @param {*} app : express app
 * @returns
 */

const initApiRoutes = (app) => {
  // middleware
  //   router.all("*", checkUserJwt, checkUserPermission);

  //rest api - dùng web sử dụng các method (CRUD)
  //GET(R), POST (C), PUT (U), DELETE (D)
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  // course router
  router.get("/ ", courseController.handleFindCourse);
  router.get("/findAllCourses", courseController.handleFindCourse);
  router.get("/findCourseByID/:id", courseController.handleFindCourseByID);
  router.get("/findPopularCourses", courseController.handleFindPopularCourses);
  router.get(
    "/findCourseSimilar/:id",
    courseController.handleFindCourseSimilar
  );
  router.get("/searchCourse/:keyword", courseController.handleSearchCourse);

  // 1. review router
  router.get(
    "/getCourseReviewsAndAverageRating/:courseID",
    reviewController.handleGetCourseReviewsAndAverageRating
  );
  router.get(
    "/findReviewByCourseID/:courseID",
    reviewController.handleFindReviewByCourseID
  );

  // 2. teacher router
  router.get(
    "/teacherOverview/:teacherID",
    teacherController.handleTeacherOverview
  );
  // 3. userFlow router
  router.get(
    "/findCourseByTeacherID_Categories/:teacherID",
    userFlowController.handleFindCourseByTeacherID_Categories
  );

  router.get("/getCourseOfUser/:userID", userFlowController.getCourseOfUser);

  // 4. user router
  router.get("/getTopTeacher", userController.getTopTeacher);
  router.get("/getAllCourseUser/:userID", userController.getAllCourseUser);
  router.get(
    "/findCourseUserState1/:userID", // on going
    userController.findCourseUserState1
  );
  router.get(
    "/findCourseUserState2/:userID", // conpleted
    userController.findCourseUserState2
  );
  //   router.post("/user/create", userController.create);
  //   router.put("/user/update", userController.update);
  //   router.delete("/user/delete", userController.remove);

  // 5. lesson router
  router.get("/getAllLesson", lessonController.findAllLesson);

  // 6. project router
  router.get("/getProjectByUser/:userID", projectController.getProjectByUser);
  router.post("/createProject", projectController.createProject);

  //7. cart router
  router.get("/getCartByUser/:userID", cartController.getCartByUser);
  router.post("/addCourseToCart", cartController.addCourseToCart);
  router.post("/cart/delete-selected", cartController.removeSelectedCartItems);
  router.post(
    "/cart/deleteSelectedCourse",
    cartController.deleteSelectedCourse
  );
  router.post("/cart/total-price", cartController.calculateTotalPrice);

  // 8. order router
  router.get(
    "/getOrderByUserID/:userID",
    orderController.handleGetOrderByUserID
  );

  //ĐÁNH GIÁ KHÓA HỌC
  router.post("/createReview", reviewController.handleCreateReview);

  router.post("/buyCourses", orderController.handleBuyCourses);
  return app.use("/api", router);
};

export default initApiRoutes;
