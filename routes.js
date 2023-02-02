const express = require("express");
const userRoute = require("./modules/user-auth/user.controller");

const routes = express.Router();
routes.get("/", (req, res) => res.json("hey there hello "));
routes.use("/user", userRoute);

module.exports = routes;
