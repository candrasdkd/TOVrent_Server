let io;

module.exports = {
  init: (server) => {
    io = require("socket.io").listen(server);
    io.origins("*:*");
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  },
};
