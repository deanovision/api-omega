require("dotenv").config();
const express = require("express");
const server = express();
server.use(express.json());

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`\n --- Server Listening on port ${port}\n`);
});
