const { createSchoolQuery } = require("./school.dal");

module.exports.createSchoolService = async (req, res) => {
  let body = req.body;
  try {
    await createSchoolQuery({ ...body });
    return res.status(200).json({ msg: "School created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};
