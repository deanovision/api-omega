const { authenticateToken, handleErrors } = require("../middleware");
const { userRouter, postsRouter } = require("../routes");

module.exports = (server, router) => {
  server.get("/", (req, res) => res.status(200).json({ message: "connected" }));
  server.use("/users", authenticateToken, userRouter(router), handleErrors);
  server.use("/posts", authenticateToken, postsRouter(router), handleErrors);
};
