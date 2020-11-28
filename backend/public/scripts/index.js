navigator.getUserMedia(
  { video: true, audio: true },
  (stream) => {
    const localVideo = document.getElementById("local-video");
    if (localVideo) {
      localVideo.srcObject = stream;
    }
  },
  (error) => {
    console.warn(error.message);
  }
);

function updateUserList(socketIds) {
  const activeUserContainer = document.getElementById("active-user-container");

  socketIds.forEach((socketId) => {
    const alreadyExistingUser = document.getElementById(socketId);
    if (!alreadyExistingUser) {
      const userContainerEl = createUserItemContainer(socketId);
      activeUserContainer.appendChild(userContainerEl);
    }
  });
}

function createUserItemContainer(socketId) {
  const userContainerEl = document.createElement("div");

  const usernameEl = document.createElement("p");

  userContainerEl.setAttribute("class", "active-user");
  userContainerEl.setAttribute("id", socketId);
  usernameEl.setAttribute("class", "username");
  usernameEl.innerHTML = `Socket: ${socketId}`;

  userContainerEl.appendChild(usernameEl);

  userContainerEl.addEventListener("click", () => {
    unselectUsersFromList();
    userContainerEl.setAttribute("class", "active-user active-user--selected");
    const talkingWithInfo = document.getElementById("talking-with-info");
    talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
    callUser(socketId);
  });
  return userContainerEl;
}

this.io("ws://localhost:5000").on("connection", (socket) => {
  const existingSocket = this.activeSockets.find((existingSocket) => existingSocket === socket.id);

  if (!existingSocket) {
    this.activeSockets.push(socket.id);

    socket.emit("update-user-list", {
      users: this.activeSockets.filter((existingSocket) => existingSocket !== socket.id),
    });

    socket.broadcast.emit("update-user-list", {
      users: [socket.id],
    });
  }

  socket.on("update-user-list", ({ users }) => {
    updateUserList(users);
  });

  socket.on("remove-user", ({ socketId }) => {
    const elToRemove = document.getElementById(socketId);

    if (elToRemove) {
      elToRemove.remove();
    }
  });
});
