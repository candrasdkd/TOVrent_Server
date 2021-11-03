// SUB-ROUTE UNTUK KEPERLUAN PING
const pingRouter = require("express").Router();

const pingHandler = require("../handlers/ping");

// http://localhost:8000/
pingRouter.get("/", pingHandler.greeting);

module.exports = pingRouter;
