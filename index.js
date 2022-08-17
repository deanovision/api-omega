require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes");
const server = express();
const router = express.Router();
server.use(express.json());

const port = process.env.PORT || 8000;

server.use("/users", userRouter(router));
server.get("/", async (req, res) => {
  res.status(200).json({ message: "connected" });
});

server.listen(port, () => {
  console.log(`\n --- Server Listening on port ${port}\n`);
});
