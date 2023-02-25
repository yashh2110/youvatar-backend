const slotSchema = require("../helpers/slot-schema-validator");

module.exports.validateSlotSchema = async (req, res, next) => {
  let body = req.body;
  try {
    await slotSchema.validateAsync(body);
    next();
  } catch (err) {
    return res.status(400).json({
      error:
        err.error?.details?.message || err.message || "Something went wrong",
    });
  }
};
