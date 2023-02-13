const express = require("express");
const middleware = require("./middleware");
const { getSignedUrlForS3 } = require("./modules/s3");
const schoolRoute = require("./modules/school-auth/school.controller");
const userRoute = require("./modules/user-auth/user.controller");

const routes = express.Router();
routes.get("/", (req, res) => res.json("hey there hello "));
routes.use("/user", middleware.validateSchema, userRoute);
routes.use("/school", schoolRoute);
routes.get("/get_signed_file_upload_url", getSignedUrlForS3);

module.exports = routes;
