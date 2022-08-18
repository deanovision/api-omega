const express = require("express");
const cors = require("cors");
const server = express();
const router = express.Router();
const serverConfig = require("./serverConfig");

server.use(cors());
server.use(express.json());
serverConfig(server, router);

module.exports = server;
