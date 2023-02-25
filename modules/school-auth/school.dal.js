const mysqlConn = require("../../config/mysql.config");
const { getTimeInMills } = require("../../helpers/get-current-time");

const mysql = mysqlConn.promise();

module.exports.createSchoolQuery = async ({
  mentor_id,
  school_name,
  school_motive,
  school_niche,
  mentor_description,
  school_language,
  school_mentor_role,
  is_teaching_online,
  mentor_experience,
  has_teaching_material,
  school_address,
  // school_bank_name,
  // school_bank_account_number,
  // school_bank_ifsc_code,
  school_video,
  school_pan,
}) => {
  const timeInMills = getTimeInMills();
  console.log("Trying to update school table.");
  // school_bank_name, school_bank_account_number, school_bank_ifsc_code
  // adding school into schools table.
  const insert_school = await mysql.execute(
    `insert into schools (mentor_id, school_name, school_motive, school_niche, school_is_active, created_at, updated_at, school_language, has_teaching_material, school_address, school_mentor_role, is_teaching_online, school_video,
      school_pan) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      mentor_id,
      school_name,
      school_motive,
      school_niche,
      // school_bank_name,
      // school_bank_account_number,
      // school_bank_ifsc_code,
      1,
      timeInMills,
      timeInMills,
      school_language,
      has_teaching_material,
      school_address,
      school_mentor_role,
      is_teaching_online,
      school_video,
      school_pan,
    ]
  );

  // adding mentor into mentors table.
  const insert_mentor = await mysql.execute(
    `insert into mentors (mentor_id, mentor_description, mentor_experience) values (?, ?, ?)`,
    [mentor_id, mentor_description, mentor_experience]
  );

  const res = await mysql.execute(
    `update users set user_is_mentor = ? where user_id = ?`,
    [1, mentor_id]
  );
  return res;
};
