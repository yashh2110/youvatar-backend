const {
  getCourseListQuery,
  getCourseQuery,
  addToCartQuery,
  removeFromCartQuery,
  checkoutQuery,
} = require("./user_course.dal");

module.exports.getCourseListService = async (req, res) => {
  let body = req.body;
  try {
    const data = await getCourseListQuery({ ...body });
    return res
      .status(200)
      .json({ msg: "Retrieved course list successfully", data: data[0] });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.getCourseService = async (req, res) => {
  let body = req.body;
  try {
    const data = await getCourseQuery({ ...body });
    return res
      .status(200)
      .json({ msg: "Retrieved courses successfully", data: data[0] });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.addToCartService = async (req, res) => {
  let body = req.body;
  try {
    await addToCartQuery({ ...body });
    return res.status(200).json({ msg: "Added to cart successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.removeFromCartService = async (req, res) => {
  let body = req.body;
  try {
    await removeFromCartQuery({ ...body });
    return res.status(200).json({ msg: "Removed from cart successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.checkoutService = async (req, res) => {
  let body = req.body;
  try {
    await checkoutQuery({ ...body });
    return res.status(200).json({ msg: "Payment successful!" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};
