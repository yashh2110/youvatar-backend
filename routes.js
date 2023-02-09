const express = require("express");
const mentorRoute = require("./modules/mentor-auth/mentor.controller");
const userRoute = require("./modules/user-auth/user.controller");

const routes = express.Router();
routes.get("/", (req, res) => res.json("hey there hello "));
routes.use("/user", middleware.validateSchema, userRoute);
routes.use("/mentor", mentorRoute);

module.exports = routes;
