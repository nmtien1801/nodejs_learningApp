import express from "express";
import apiController from "../controller/apiController";
import courseController from "../controller/courseController";
import reviewController from "../controller/reviewController";
import teacherController from "../controller/teacherController";
import userFlowController from "../controller/userFlowController";
import userController from "../controller/userController";
import lessonController from "../controller/lessonController";
import projectController from "../controller/projectController";

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
  router.get("/searchCourse/:name", courseController.handleSearchCourse);

  // review router
  router.get(
    "/getCourseReviewsAndAverageRating/:courseID",
    reviewController.handleGetCourseReviewsAndAverageRating
  );
  router.get(
    "/findReviewByCourseID/:courseID",
    reviewController.handleFindReviewByCourseID
  );

  // teacher router
  router.get(
    "/teacherOverview/:teacherID",
    teacherController.handleTeacherOverview
  );
  //userFlow router
  router.get(
    "/findCourseByTeacherID_Categories/:teacherID",
    userFlowController.handleFindCourseByTeacherID_Categories
  );

  router.get("/getCourseOfUser/:userID", userFlowController.getCourseOfUser);

  // user router
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

  // lesson router
  router.get("/getAllLesson", lessonController.findAllLesson);

  // project router
  router.get("/getProjectByUser/:userID", projectController.getProjectByUser);
  router.post("/createProject", projectController.createProject);

  return app.use("/api", router);
};

export default initApiRoutes;
