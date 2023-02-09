const { validateUser } = require("./user-validation");
const { validateSchoolSchema } = require("./school-validation");

const middleware = {
  validateUser: validateUser,
  validateSchool: validateSchoolSchema,
};

module.exports = middleware;
