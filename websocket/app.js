const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  // Event handlers for real-time updates
  socket.on("event:created", (event) => {
    socket.broadcast.emit("event:created", event);
  });

  socket.on("event:updated", (event) => {
    socket.broadcast.emit("event:updated", event);
  });

  socket.on("event:deleted", (eventId) => {
    socket.broadcast.emit("event:deleted", eventId);
  });
});

const PORT = process.env.WEBSOCKET_PORT || 3001;
server.listen(PORT, () => {});
