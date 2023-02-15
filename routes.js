const express = require("express");
const schoolRoute = require("./modules/school-auth/school.controller");
const userRoute = require("./modules/user-auth/user.controller");
const slotRotue = require("./modules/slot/slot.controller");

const routes = express.Router();
routes.get("/", (req, res) => res.json("hey there hello "));
// routes.use("/user", middleware.validateSchema, userRoute);
routes.use("/school", schoolRoute);
routes.use("/slot", slotRotue);

module.exports = routes;
