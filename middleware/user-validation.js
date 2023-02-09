const userSchema = require("../helpers/user-schema-validator");
const { getUserSession } = require("./dal");

module.exports.validateUser = async (req, res, next) => {
  const { session_token } = req.cookies;
  try {
    const data = await getUserSession({ session_token });
    if (data?.length === 0)
      return res.status(404).json({ error: "Invalid user" });
    const user_id = data[0].user_id;
    req.query.user_id = user_id;
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.validateUserSchema = async (req, res, next) => {
  let body = req.body;
  const { session_token } = req.headers;
  if (session_token) body = { ...body, session_token };
  try {
    await userSchema.validateAsync(body);
    next();
  } catch (err) {
    if (err.message) {
      const msg = err.message.replace(/"/g, "");
      return res.status(400).json({
        error: msg,
      });
    }
    return res.status(400).json({
      error:
        err.error?.details?.message || err.message || "Something went wrong",
    });
  }
};
