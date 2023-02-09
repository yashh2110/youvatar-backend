const { validateUser } = require("./user-valudation");
const { validateSchoolSchema } = require("./school-validation");

const middleware = {
  validateUser: validateUser,
  validateSchool: validateSchoolSchema,
};

module.exports = middleware;
