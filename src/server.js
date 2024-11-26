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
    origin: "http://localhost:8081", // Địa chỉ frontend
    methods: ["GET", "POST"],       // Phương thức được phép
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
// Sự kiện kết nối
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Lắng nghe tin nhắn từ client
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    // Phát tin nhắn cho tất cả client
    io.emit("receiveMessage", message);
  });

  // Xử lý ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
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
