const io = require("socket.io")();
const messageHandler = require("./handlers/messageHandler");
const uuidv1 = require("uuid").v1;

function createUsersOnline() {
  return Object.values(users).filter((u) => u.username !== undefined);
}
// const getSocketIdForUserId = (userId) =>
//   Object.keys(users).find((key) => users[key].id === userId);
const users = {};

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);
  users[socket.id] = { id: uuidv1() };
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUsersOnline() });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      // case "server/hello":
      //   console.log("got hello event:", action.data);
      //   socket.emit("action", { type: "message", data: "Good Day" });
      //   break;
      case "server/join":
        console.log("got join event: ", action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = "https://placeimg.com/140/141/any";
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        });
        socket.emit("action", { type: "self_user", data: users[socket.id] });
        break;
      case "server/private_message":
        console.log("private message: ", action.data);
        const from = users[socket.id].id;
        const conversationId = action.data.conversationId;
        const userValues = Object.values(users);
        const socketIds = Object.keys(users);
        // .find(
        //   (key) => users[key].id === conversationId
        // );
        console.log("--> users: ", userValues);
        console.log("--> socketIds: ", socketIds);
        for (let i = 0; i < userValues.length; i++) {
          console.log(i, "--> user id: ", userValues[i].id);
          if (userValues[i].id === conversationId) {
            socketId = socketIds[i];
            console.log("recepient socketId: ", socketId);
            io.sockets.sockets[socketId].emit("action", {
              type: "private_message",
              data: {
                ...action.data,
                conversationId: from,
              },
            });
          }
        }
        break;
    }
  });
});

io.listen(3001);
