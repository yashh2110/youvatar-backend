const Joi = require("joi");

// need to update validation based on requirements.
const schoolSchema = Joi.object({
  mentor_id: Joi.string().guid().required(),
  school_name: Joi.string().min(3).max(30).required(),
  school_motive: Joi.string().min(3).max(30).required(),
  school_niche: Joi.string().min(3).max(30).required(),
  mentor_description: Joi.string().min(3).max(200).required(),
  school_language: Joi.string().min(3).max(30).required(),
  school_mentor_role: Joi.string().min(3).max(30).required(),
  is_teaching_online: Joi.boolean().required(),
  mentor_experience: Joi.string().min(3).max(30).required(),
  has_teaching_material: Joi.boolean().required(),
  school_address: Joi.string().min(3).max(200).required(),
  school_bank_name: Joi.string().min(3).max(30).required(),
  // validation for only indian bank accounts
  school_bank_account_no: Joi.string()
    .pattern(new RegExp("^[0-9]{9,18}$"))
    .min(9)
    .max(18)
    .required(),
  school_bank_ifsc_code: Joi.string()
    .pattern(new RegExp("^[A-Z]{4}0[A-Z0-9]{6}$"))
    .length(11)
    .required(),
  school_review_file: Joi.string().length(300).required(),
});

module.exports = schoolSchema;
