import express from "express";
require("dotenv").config(); // đọc file .env
import initApiRoutes from "./router/api";
import configCORS from "./config/cors";

const app = express();

// -> fix bug lưu img : request entity too large react
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//-------------------------------------------------------------------------------------
// share localHost BE & FE
configCORS(app);

// init api router kết nối FE
initApiRoutes(app);

// đây là midleware(chạy từ trên xuống và xoay hoài nếu không có next)
// nếu đúng authenticate thì trang web hiện (bởi next) thường đặt ở giữa
// Cannot get/(link...) -> 404 not found
app.use((req, res) => {
    return res.send("404 not found");
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`>>> jwt backend is running on the port ${PORT}`);
  });