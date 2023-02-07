const Joi = require("joi");

const courseSchema = Joi.object({
  course_admin: Joi.number().integer().required(),
  course_name: Joi.string().max(300).required(),
  course_category: Joi.number().integer().required(),
  university: Joi.number().integer().required(),
  description: Joi.string().max(600).required(),
  no_of_batches: Joi.number().required(),
  timings: Joi.string().max(300).required(),
  students_per_batch: Joi.number().required(),
  duration: Joi.string().max(100).required(),
  no_of_module: Joi.number().required(),
  pre_requisites: Joi.string().max(300).required(),
  access: Joi.number().valid(0, 1),
  certificate: Joi.number().valid(0, 1),
  total_assignments: Joi.number().required(),
  overview_video: Joi.string().max(500).required(),
  course_actual_price: Joi.number().required(),
  course_selling_price: Joi.number().required(),
  course_markup_percentage: Joi.number().required(),
  course_revenue: Joi.number().required(),
  course_priority: Joi.string().max(2).required(),
  course_poupularity: Joi.string().max(2).required(),
  course_active: Joi.number().valid(0, 1),
  course_auth: Joi.number().valid(0, 1),
  course_teaching_type: Joi.string().max(10).required(),
  course_start_date: Joi.date().required(),
  course_end_date: Joi.date().required(),
  created_at: Joi.string().max(25).required(),
  updated_at: Joi.string().max(25).required(),
});

module.exports = courseSchema;
