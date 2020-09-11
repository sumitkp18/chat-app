let currentMessageId = 1;

function createMessage(user, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: user.id,
      name: user.username,
      avatar: user.avatar,
    },
  };
}

function handleMessage(socket, users) {
  socket.on("message", (messageText) => {
    console.log(messageText);
    user = users[socket.id];
    message = createMessage(user, messageText);
    socket.broadcast.emit("message", message);
  });
}

module.exports = { handleMessage };
