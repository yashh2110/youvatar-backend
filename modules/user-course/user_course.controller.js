const express = require("express");
const userCourse = require(".");
// const middleware = require("../../middleware");
const userCourseRoute = express.Router();

userCourseRoute.get("/search", userCourse.getCourseList);
userCourseRoute.get("/course_details", userCourse.getCourse);
userCourseRoute.post("/add_course", userCourse.addToCart);
userCourseRoute.post("/remove_course", userCourse.removeFromCart);
userCourseRoute.get("/checkout", userCourse.checkout);

module.exports = userCourseRoute;
