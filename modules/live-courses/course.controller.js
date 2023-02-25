const express = require("express");
const { createCourse, course } = require(".");
const courseRouter = express.Router();

courseRouter.post("/create_course/landing_page", createCourse.landingPage);
courseRouter.post("/create_course/outcomes", createCourse.outcomes);
courseRouter.post("/create_course/requirements", createCourse.requirements);
courseRouter.post("/create_course/messages", createCourse.messages);
courseRouter.post("/create_course/pricing", createCourse.pricing);

courseRouter.post("/create_course/module", createCourse.module);
courseRouter.post("/create_course/lecture", createCourse.lecture);
courseRouter.post(
  "/create_course/lecture/resource",
  createCourse.lectureResource
);

courseRouter.post("/create_course/batch", createCourse.batch);

courseRouter.get("/:course_id/modules", course.getModules);
courseRouter.get("/:module_id/lectures", course.getLectures);

module.exports = courseRouter;
