const mysqlConn = require("../../config/mysql.config");
const { getTimeInMills } = require("../../helpers/get-current-time");

const mysql = mysqlConn.promise();

module.exports.createSchoolQuery = async ({
  mentor_id,
  mentor_school_name,
  mentor_niche,
  mentor_bank_name,
  mentor_bank_account_number,
  bank_ifsc_code,
  mentor_review_file,
}) => {
  const timeInMills = getTimeInMills();
  const _ = await mysql.execute(
    `insert into schools (mentor_id, mentor_school_name, mentor_niche, mentor_bank_name, mentor_bank_accout_number, bank_ifsc_code, mentor_review_file, school_is_active, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      mentor_id,
      mentor_school_name,
      mentor_niche,
      mentor_bank_name,
      mentor_bank_account_number,
      bank_ifsc_code,
      mentor_review_file,
      1,
      timeInMills,
      timeInMills,
    ]
  );
  const res = await mysql.execute(
    `update user set user_is_mentor = ? where user_id = ?`,
    [1, mentor_id]
  );
  return res;
};
