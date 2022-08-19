const { authenticateToken, handleErrors } = require("../middleware");
const { userRouter } = require("../routes");

module.exports = (server, router) => {
  server.get("/", (req, res) => res.status(200).json({ message: "connected" }));
  server.use("/users", authenticateToken, userRouter(router), handleErrors);
};
