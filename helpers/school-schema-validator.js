const Joi = require("joi");

const schoolSchema = Joi.object({
  school_name: Joi.string().min(3).max(30),
  niche: Joi.string().min(3).max(30),
  bank_name: Joi.string().min(3).max(30),
  // add a correct bank account no validator
  bank_account_no: Joi.string().min(3).max(30),
  bank_ifsc_code: Joi.string().min(3).max(30),

  // username: Joi.string().min(3).max(30),
  // name: Joi.string().min(3).max(35),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6),
  // dob: Joi.number().integer(),
  // email: Joi.string().email({
  //   minDomainSegments: 2,
  //   tlds: { allow: ["com", "in", "ai", "org", "co"] },
  // }),
  // phone: Joi.string()
  //   .length(10)
  //   .pattern(/^[0-9]+$/),
  // otp: Joi.string().length(4),
  // session_token: Joi.string().guid(),
  // mentor: Joi.string().length(1),
  // source: Joi.string().length(300),
}).or("email", "phone");

module.exports = schoolSchema;
