const mysqlConn = require("../../config/mysql.config");
const { getTimeInMills } = require("../../helpers/get-current-time");

const mysql = mysqlConn.promise();

module.exports.createSchoolQuery = async ({
  mentor_id,
  school_name,
  school_niche,
  school_bank_name,
  school_bank_account_number,
  school_bank_ifsc_code,
  school_review_file,
}) => {
  const timeInMills = getTimeInMills();
  const _ = await mysql.execute(
    `insert into schools (mentor_id, school_name, school_niche, school_bank_name, school_bank_accout_number, school_bank_ifsc_code, school_review_file, school_is_active, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      mentor_id,
      school_name,
      school_niche,
      school_bank_name,
      school_bank_account_number,
      school_bank_ifsc_code,
      school_review_file,
      1,
      timeInMills,
      timeInMills,
    ]
  );
  const res = await mysql.execute(
    `update user set user_is_school = ? where user_id = ?`,
    [1, mentor_id]
  );
  return res;
};
