console.log("server up and running...");

const io = require("socket.io")(3000, {
  cors: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
});

let users = new Map();

io.on("connection", (socket) => {
  //print unique socket ID for each client
  console.log(socket.id);

  socket.on("addUser", (user, room) => {
    console.log("user joined: " + user + " in room: " + room);
    socket.join(room);
    if (users.has(room)) {
      const newUsers = users.get(room);
      newUsers.push(user);
      users.set(room, newUsers);
    } else {
      users.set(room, [user]);
    }
    io.to(room).emit("updateUserList", users.get(room));
  });

  socket.on("removeUser", (user, room) => {
    console.log("user: " + user + " left room: " + room);
    if (users.has(room)) {
      const newUsers = users.get(room);
      const index = newUsers.indexOf(user);
      newUsers.splice(index, 1);
      users.set(room, newUsers);
      console.log(users.get(room));
      io.to(room).emit("removeUserFromList", users.get(room));
    }
  });

  socket.on("sendMessage", (message) => {
    console.log(message);
    io.to(message.room).emit("receiveMessage", message);
  });

  socket.on("sendDetails", (user, room) => {
    io.to(room).emit("updateUsers", user);
  });
});
