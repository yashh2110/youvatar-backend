const { validateCourseSchema } = require("./course-validation");

const middleware = {
  validateCourse: validateCourseSchema,
};

module.exports = middleware;
