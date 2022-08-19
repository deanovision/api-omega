const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const server = express();
const router = express.Router();
const serverConfig = require("./serverConfig");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));
serverConfig(server, router);

module.exports = server;
