const express = require("express");
const { validateCourse } = require("../../middleware");
const courseService = require("./course.service");
const courseRoutes = express.Router();

courseRoutes
  .route("/create_course")
  .post(validateCourse, courseService.createCourseService);

module.exports = courseRoutes;
