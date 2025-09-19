import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 정적 파일 제공 (client.html)
app.use(express.static("public"));

// 소켓 연결 이벤트
io.on("connection", (socket) => {
  console.log("🔌 새 유저 접속!");

  socket.on("chat message", (msg) => {
    console.log("💬", msg);
    io.emit("chat message", msg); // 전체 클라이언트에게 전송
  });

  socket.on("disconnect", () => {
    console.log("❌ 유저 나감");
  });
});

server.listen(3000, () => {
  console.log("🚀 서버 실행중 → http://localhost:3000");
});
