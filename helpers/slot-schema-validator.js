const Joi = require("joi");

const slotSchema = Joi.object({
  date: Joi.date().iso().required(),
  start_time: Joi.string()
    .pattern(new RegExp("\\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))"))
    .required(),
  end_time: Joi.string()
    .pattern(new RegExp("\\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))"))
    .required(),
}).custom((doc, helpers) => {
  if (doc.start_time >= doc.end_time) {
    throw new Error("Start time should be lower than end time!");
  }
  return doc;
});

module.exports = slotSchema;
