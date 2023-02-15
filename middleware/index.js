const { validateUser, validateUserSchema } = require("./user-validation");
const { validateSchoolSchema } = require("./school-validation");
const { validateSlotSchema } = require("./slot-validation");

const middleware = {
  validateUser: validateUser,
  validateSchema: validateUserSchema,
  validateSchool: validateSchoolSchema,
  validateSlot: validateSlotSchema,
};

module.exports = middleware;
