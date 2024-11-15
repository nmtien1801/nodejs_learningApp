import express from "express";
import apiController from "../controller/apiController";

const router = express.Router(); // bằng app = express();
/**
 *
 * @param {*} app : express app
 * @returns
 */

const initApiRoutes = (app) => {
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  return app.use("/api", router);
};

export default initApiRoutes;
