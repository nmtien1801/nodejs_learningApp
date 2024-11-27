import express from "express";
require("dotenv").config(); // đọc file .env
import initApiRoutes from "./router/api";
import configCORS from "./config/cors";
// chatbox
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả kết nối
  },
});

// -> fix bug lưu img : request entity too large react
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//-------------------------------------------------------------------------------------
// share localHost BE & FE
configCORS(app);

// init api router kết nối FE
initApiRoutes(app);

// ====================== chatbox ======================
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", (data) => {
    console.log("Message received: ", data);
    io.emit("receive_message", data); // Gửi tin nhắn lại cho tất cả client
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


// đây là midleware(chạy từ trên xuống và xoay hoài nếu không có next)
// nếu đúng authenticate thì trang web hiện (bởi next) thường đặt ở giữa
// Cannot get/(link...) -> 404 not found
app.use((req, res) => {
  return res.send("404 not found");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`>>> jwt backend is running on the port ${PORT}`);
});
