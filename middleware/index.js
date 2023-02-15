const { validateUser } = require("./user-validation");
const { validateSchoolSchema } = require("./school-validation");
const { validateSlotSchema } = require("./slot-validation");

const middleware = {
  validateUser: validateUser,
  validateSchool: validateSchoolSchema,
  validateSlot: validateSlotSchema,
};

module.exports = middleware;
