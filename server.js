import express from "express";
import http from "http";
import { Server } from "socket.io";
import ACTIONS from "./actions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const roomCodeMap = {}; // Stores the latest code for each room

// Function to get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
    socketId,
    username: userSocketMap[socketId],
  }));
}

io.on("connection", (socket) => {
  console.log("🔌 New socket connected:", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, { clients, username, socketId: socket.id });
    });

    // If there's existing code for the room, sync it with the new user
    if (roomCodeMap[roomId]) {
      io.to(socket.id).emit(ACTIONS.SYNC_CODE, { code: roomCodeMap[roomId] });
    }
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, language, code }) => {
    if (!roomCodeMap[roomId]) {
      roomCodeMap[roomId] = { html: "", css: "", js: "" };
    }
    roomCodeMap[roomId][language] = code;

    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { language, code });
  });

  socket.on(ACTIONS.LEAVE_ROOM, ({ roomId }) => {
    if (userSocketMap[socket.id]) {
      const username = userSocketMap[socket.id];
      socket.leave(roomId);
      delete userSocketMap[socket.id];

      socket.in(roomId).emit(ACTIONS.DISCONNECTED, { socketId: socket.id, username });
      console.log(`❌ ${username} left the room ${roomId}`);
    }
  });

  socket.on("disconnecting", () => {
    const username = userSocketMap[socket.id];
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, { socketId: socket.id, username });
    });

    delete userSocketMap[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
