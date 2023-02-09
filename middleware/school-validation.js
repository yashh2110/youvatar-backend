const schoolSchema = require("../helpers/school-schema-validator");

module.exports.validateSchoolSchema = async (req, res, next) => {
  let body = req.body;
  try {
    await schoolSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      error:
        err.error?.details?.message || err.message || "Something went wrong",
    });
  }
};
