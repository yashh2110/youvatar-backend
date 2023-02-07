const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  name: Joi.string().min(3).max(35),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6),
  dob: Joi.number().integer(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "in", "ai", "org", "co"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  otp: Joi.string().length(4),
  session_token: Joi.string().guid(),
  mentor: Joi.number().min(0).max(1),
  source: Joi.alternatives()
    .try(
      Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in", "ai", "org", "co"] },
      }),
      Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
    )
    .error(new Error("Invalid email or phone number")),
});

module.exports = userSchema;
