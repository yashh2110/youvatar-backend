const { validateUser, validateUserSchema } = require("./user-validation");
const { validateSchoolSchema } = require("./school-validation");

const middleware = {
  validateUser: validateUser,
  validateSchema: validateUserSchema,
  validateSchool: validateSchoolSchema,
};

module.exports = middleware;
