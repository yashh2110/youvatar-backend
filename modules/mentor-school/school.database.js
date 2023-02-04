const mysqlConn = require("../../config/mysql.config");
const mysql = mysqlConn.promise();
// CREATE NEW MENTOR SCHOOL

module.exports.createNewMentorSchool = async ({
  mentor_id,
  mentor_school_name,
  mentor_niche,
  mentor_bank_name,
  mentor_bank_account_number,
  bank_ifsc_code,
  mentor_review_file,
}) => {
  // Create new row in schools table
  const insertQuery = `
      INSERT INTO schools (
        mentor_id,
        mentor_school_name,
        mentor_niche,
        mentor_bank_name,
        mentor_bank_account_number,
        bank_ifsc_code,
        mentor_review_file,
        school_is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `;
  const response = await mysql.execute(insertQuery, [
    mentor_id,
    mentor_school_name,
    mentor_niche,
    mentor_bank_name,
    mentor_bank_account_number,
    bank_ifsc_code,
    mentor_review_file,
  ]);

  // Update user's is_mentor field in users table
  const updateQuery = `
      UPDATE users SET user_is_mentor = 1 WHERE user_id = ?`;
  await mysql.query(updateQuery, [mentor_id]);
  return response;
};
