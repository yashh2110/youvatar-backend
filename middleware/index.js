const { validateUser, validateUserSchema } = require("./user-validation");

const middleware = {
  validateUser: validateUser,
  validateSchema: validateUserSchema,
};

module.exports = middleware;
