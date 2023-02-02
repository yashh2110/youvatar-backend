const express = require("express");
const userRoute = require("./modules/user-auth/user.controller");

const routes = express.Router();

routes.use("/user", userRoute);

module.exports = routes;
