const mysqlConn = require("../../config/mysql.config");
const { getTimeInMills } = require("../../helpers/get-current-time");

const mysql = mysqlConn.promise();

module.exports.createAccountByEmailQuery = async ({ email }) => {
  const res = await mysql.execute("insert into users (user_email) values (?)", [
    email,
  ]);
  return res;
};

module.exports.createAccountByPhoneQuery = async ({ phone }) => {
  const res = await mysql.execute("insert into users (user_phone) values (?)", [
    phone,
  ]);
  return res;
};

module.exports.setOtpByEmailQuery = async ({ otp, email }) => {
  const timeInMills = getTimeInMills();
  const expiryTime = timeInMills + 5 * 60000;
  const res = await mysql.execute(
    "insert into user_otps (otp,email,created_at,expired_at) values (?,?,?,?)",
    [otp, email, timeInMills, expiryTime]
  );
  return res;
};

module.exports.setOtpByPhoneQuery = async ({ otp, phone }) => {
  const timeInMills = getTimeInMills();
  const expiryTime = timeInMills + 5 * 60000;
  const res = await mysql.execute(
    "insert into user_otps (otp,phone,created_at,expired_at) values (?,?,?,?)",
    [otp, phone, timeInMills, expiryTime]
  );
  return res;
};

module.exports.verifyOtpByEmailQuery = async ({ email }) => {
  const [rows, fields] = await mysql.execute(
    `select otp,expired_at from user_otps where email="${email} order by created_at desc limit 1`
  );
  console.log(rows);
  return rows;
};
module.exports.verifyOtpByPhoneQuery = async ({ phone }) => {
  const [rows, fields] = await mysql.execute(
    `select otp,expired_at from user_otps where phone="${phone} order by created_at desc limit 1`
  );
  console.log(rows);
  return rows;
};

// module.exports = async({ session_token });

// FIND USERNAME

module.exports.checkUsernameAvailability = async (userName) => {
  try {
    const [rows] = await mysql.execute(
      `SELECT * FROM users WHERE user_name LIKE '%${userName}%'`
    );

    if (rows.length > 0) {
      return `Username is not available.`;
    } else {
      return `Username is available.`;
    }
  } catch (error) {
    throw error;
  }
};
