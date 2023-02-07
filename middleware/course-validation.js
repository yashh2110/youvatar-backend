const courseSchema = require("../helpers/course-schema-validator");

module.exports.validateCourseSchema = async (req, res, next) => {
  let body = req.body;
  try {
    await courseSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      error:
        err.error?.details?.message || err.message || "Something went wrong",
    });
  }
};
