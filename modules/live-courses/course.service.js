const {
  createCourseLandingPageQuery,
  addCourseOutcomesQuery,
  addCourseRequirementsQuery,
  addCourseMessagesQuery,
  addCoursePricingQuery,
  createModuleQuery,
  createLectureQuery,
  getModulesQuery,
  getLecturesQuery,
  addLectureResourceQuery,
  createBatchQuery,
} = require("./course.dal");

module.exports.createCourseLandingPage = async (req, res) => {
  const data = req.body;
  try {
    const resp = await createCourseLandingPageQuery({ data });
    console.log(resp);
    return res.status(200).json({ msg: `success`, course_id: resp?.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "User already registered" });
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.addCourseOutcomes = async (req, res) => {
  const data = req.body;
  try {
    await addCourseOutcomesQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.addCourseRequirements = async (req, res) => {
  const data = req.body;
  try {
    await addCourseRequirementsQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.addCourseMessages = async (req, res) => {
  const data = req.body;
  try {
    await addCourseMessagesQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.addCoursePricing = async (req, res) => {
  const data = req.body;
  try {
    await addCoursePricingQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.createModule = async (req, res) => {
  const data = req.body;
  try {
    await createModuleQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Module already created" });
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};
module.exports.createLecture = async (req, res) => {
  const data = req.body;
  try {
    await createLectureQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Lecture already created" });
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.addLectureResources = async (req, res) => {
  const data = req.body;
  try {
    await addLectureResourceQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.createBatch = async (req, res) => {
  const data = req.body;
  try {
    await createBatchQuery({ data });
    return res.status(200).json({ msg: `success` });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Module already created" });
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.getModules = async (req, res) => {
  const { course_id } = req.params;
  try {
    const data = await getModulesQuery({ data: { course_id } });
    return res.status(200).json({ data, msg: "fetched successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};
module.exports.getLectures = async (req, res) => {
  const { module_id } = req.params;
  try {
    const data = await getLecturesQuery({ data: { module_id } });
    return res.status(200).json({ data, msg: "fetched successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};
