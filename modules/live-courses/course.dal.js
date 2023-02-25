const mysqlConn = require("../../config/mysql.config");
const mysql = mysqlConn.promise();

module.exports.createCourseLandingPageQuery = async ({ data }) => {
  const {
    school_id,
    course_title,
    course_subtitle,
    course_description,
    course_language,
    course_difficulty_level,
    course_category,
    course_intro_file,
    course_thumbnail,
  } = data;

  const [rows, _] = await mysql.execute(
    "insert into courses (school_id,course_title,course_subtitle,course_description,course_language,course_difficulty_level,course_category,course_intro_file,course_thumbnail) values (?,?,?,?,?,?,?,?,?)",
    [
      school_id,
      course_title,
      course_subtitle,
      course_description,
      course_language,
      course_difficulty_level,
      course_category,
      course_intro_file,
      course_thumbnail,
    ]
  );
  return rows;
};

module.exports.addCourseOutcomesQuery = async ({ data }) => {
  const { course_outcomes, course_id } = data;
  const [rows, _] = await mysql.execute(
    "update courses set course_outcomes=? where course_id=?",
    [course_outcomes, course_id]
  );
  return rows;
};

module.exports.addCourseRequirementsQuery = async ({ data }) => {
  const { course_prerequisites, targeted_learners, course_id } = data;
  const [rows, _] = await mysql.execute(
    "update courses set course_prerequisites=?,targeted_learners=? where course_id=?",
    [course_prerequisites, targeted_learners, course_id]
  );
  return rows;
};

module.exports.addCourseMessagesQuery = async ({ data }) => {
  const { course_welcome_text, course_completion_text, course_id } = data;
  const [rows, _] = await mysql.execute(
    "update courses set course_welcome_text=?,course_completion_text=? where course_id=?",
    [course_welcome_text, course_completion_text, course_id]
  );
  return rows;
};

module.exports.addCoursePricingQuery = async ({ data }) => {
  const { course_actual_price, course_id } = data;
  const [rows, _] = await mysql.execute(
    "update courses set course_actual_price=? where course_id=?",
    [course_actual_price, course_id]
  );
  return rows;
};

module.exports.createModuleQuery = async ({ data }) => {
  const { module_number, module_name, course_id } = data;

  const [rows, _] = await mysql.execute(
    "insert into modules (module_number,module_name,course_id) values (?,?,?)",
    [module_number, module_name, course_id]
  );
  return rows;
};

module.exports.createLectureQuery = async ({ data }) => {
  const { lecture_number, lecture_name, module_id } = data;

  const [rows, _] = await mysql.execute(
    "insert into lectures (lecture_number,lecture_name,module_id) values (?,?,?)",
    [lecture_number, lecture_name, module_id]
  );
  return rows;
};

module.exports.addLectureResourceQuery = async ({ data }) => {
  const { resource_file, lecture_id } = data;
  const [rows, _] = await mysql.execute(
    "update lectures set resource_file=? where lecture_id=?",
    [resource_file, lecture_id]
  );
  return rows;
};

module.exports.createBatchQuery = async ({ data }) => {
  const { batch_number, student_count, start_time, end_time, course_id } = data;

  const [rows, _] = await mysql.execute(
    "insert into batches (batch_number,student_count,start_time,end_time,course_id) values (?,?,?,?,?)",
    [batch_number, student_count, start_time, end_time, course_id]
  );
  return rows;
};

module.exports.getModulesQuery = async ({ data }) => {
  const { course_id } = data;
  const [rows, _] = await mysql.execute(
    "select module_id,module_name,module_number from modules where is_active=? and course_id=?",
    [1, course_id]
  );
  return rows;
};

module.exports.getLecturesQuery = async ({ data }) => {
  const { module_id } = data;
  const [rows, _] = await mysql.execute(
    "select lecture_id,lecture_name,lecture_number from lectures where is_active=? and module_id=?",
    [1, module_id]
  );
  return rows;
};
