const express = require("express");
const courseService = require("./course.services");
const courseRoutes = express.Router();

courseRoutes.route("/create_course").post(courseService.createCourseService);

module.exports = courseRoutes;
