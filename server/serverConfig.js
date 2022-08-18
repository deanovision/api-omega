const { authenticateToken, handleErrors } = require("../middleware");
const { userRouter } = require("../routes");
// const express = require("express");
// const server = express();
// const router = express.Router();
// const cors = require("cors");
// server.use(express.json());
// server.use(cors());
// const port = process.env.PORT || 8000;

// server.get("/", authenticateToken, handleErrors, async (req, res) => {
//   res.status(200).json({ message: "connected", ...req.userInfo });
// });
module.exports = (server, router) => {
  server.get("/", (req, res) => res.status(200).json({ message: "connected" }));
  server.use("/users", authenticateToken, handleErrors, userRouter(router));
};
