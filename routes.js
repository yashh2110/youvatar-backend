const express = require("express");
const middleware = require("./middleware");
const { getSignedUrlForS3 } = require("./modules/s3");
const schoolRoute = require("./modules/school-auth/school.controller");
const userRoute = require("./modules/user-auth/user.controller");
const slotRotue = require("./modules/mentor-review-slots/slot.controller");
const courseRouter = require("./modules/live-courses/course.controller");

const routes = express.Router();

// hello
routes.get("/", (req, res) => res.json("hey there hello "));

routes.use("/user", middleware.validateSchema, userRoute);

routes.use("/school", schoolRoute);

routes.get("/get_signed_file_upload_url", getSignedUrlForS3);

routes.use("/slot", slotRotue);

routes.use("/courses", courseRouter);

module.exports = routes;
