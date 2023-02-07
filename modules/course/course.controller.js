const express = require("express");
const { validateCourseSchema } = require("../../middleware/course-validation");
const courseService = require("./course.services");
const courseRoutes = express.Router();

courseRoutes
  .route("/create_course")
  .post(validateCourseSchema, courseService.createCourseService);

module.exports = courseRoutes;
