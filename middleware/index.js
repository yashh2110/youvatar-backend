const { validateUser } = require("./user-valudation");

const middleware = {
  validateUser: validateUser,
};

module.exports = middleware;
