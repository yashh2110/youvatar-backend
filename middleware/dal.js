const mysqlConn = require("../config/mysql.config");
const { getTimeInMills } = require("../helpers/get-current-time");
const mysql = mysqlConn.promise();

module.exports.getUserSession = async ({ session_token }) => {
  const current_time = getTimeInMills();
  const [rows, fields] = await mysql.execute(
    `select user_id,expired_at from user_sessions where session_token=? and expired_at > ?`,
    [session_token, current_time]
  );
  return rows;
};
