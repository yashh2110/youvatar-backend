const express = require("express");
const userRoute = require("./modules/user-auth/user.controller");
const schoolRoutes = require("./modules/mentor-school/school.controller");
const routes = express.Router();

routes.get("/", (req, res) => res.json("hey there hello "));
routes.use("/user", userRoute);
routes.use("/school", schoolRoutes);

module.exports = routes;
