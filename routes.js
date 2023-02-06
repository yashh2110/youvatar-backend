const express = require("express");
const middleware = require("./middleware");
const userRoute = require("./modules/user-auth/user.controller");

const routes = express.Router();
routes.get("/", (req, res) => res.json("hey there hello "));
routes.use("/user", middleware.validateSchema, userRoute);

module.exports = routes;
