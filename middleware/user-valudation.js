const { getUserSession } = require("./dal");

module.exports.validateUser = async (req, res, next) => {
  const { session_token } = req.headers;
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
