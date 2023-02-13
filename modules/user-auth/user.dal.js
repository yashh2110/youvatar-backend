const mysqlConn = require("../../config/mysql.config");
const {
  getTimeInMills,
  getYearsInMills,
} = require("../../helpers/get-current-time");
const { getUuid } = require("../../helpers/get-uuid");

const mysql = mysqlConn.promise();

module.exports.createAccountByEmailQuery = async ({ email }) => {
  const [rows, fields] = await mysql.execute(
    "select count(*) as count from users where user_email = ? and user_auth= ?",
    [email, 0]
  );
  console.log(rows, fields);
  if (rows[0].count > 0) return { res: "existing" };
  const current_time = getTimeInMills();
  const res = await mysql.execute(
    "insert into users (user_email,created_at) values (?,?)",
    [email, current_time]
  );
  return res;
};

module.exports.createAccountByPhoneQuery = async ({ phone }) => {
  const [rows, fields] = await mysql.execute(
    "select count(*) as count from users where user_phone = ? and user_auth= ?",
    [phone, 0]
  );
  if (rows[0].count > 0) return { res: "existing" };
  const current_time = getTimeInMills();
  const res = await mysql.execute(
    "insert into users (user_phone,created_at) values (?,?)",
    [phone, current_time]
  );
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

// verify otp

module.exports.verifyOtpByEmailQuery = async ({ email }) => {
  const [rows, fields] = await mysql.execute(
    `select otp,expired_at from user_otps where email="${email}" order by created_at desc limit 1`
  );
  console.log(rows);
  return rows;
};
module.exports.verifyOtpByPhoneQuery = async ({ phone }) => {
  const [rows, fields] = await mysql.execute(
    `select otp,expired_at from user_otps where phone="${phone}" order by created_at desc limit 1`
  );
  console.log(rows);
  return rows;
};

module.exports.createUserSessionQuery = async ({ session_token, src }) => {
  console.log(src);
  const [rows, fields] = await mysql.execute(
    `select user_id from users where user_email=? or user_phone=?`,
    [src, src]
  );
  console.log(rows);
  const user_id = rows[0].user_id;
  const time = getTimeInMills();
  const expired_at = time + getYearsInMills(1);
  console.log(getYearsInMills(1), expired_at);
  const [data, _] = await mysql.execute(
    `insert into user_sessions (session_token,user_id,created_at,expired_at) values (?,?,?,?)`,
    [session_token, user_id, time, expired_at]
  );
  return { data, user_id };
};

module.exports.setUserDetailsQuery = async ({ user_data, user_id }) => {
  const { username, name, password, dob, mentor } = user_data;
  console.log(username, name, password, dob, mentor, user_id);
  const [data, _] = await mysql.execute(
    `update users set user_name=?, user_nickname=?,user_password=?, user_dob=?, user_is_mentor=?,user_is_active=?,user_auth=? where user_id=?`,
    [username, name, password, dob, mentor, 1, 1, user_id]
  );
  return data;
};

module.exports.setProfileImgQuery = async ({
  user_img,
  user_color,
  user_id,
}) => {
  let url;
  let binds;
  if (user_img) {
    url = `update users set user_img=?, user_profile_color=? where user_id=?`;
    binds = [user_img, user_color, user_id];
  } else {
    url = `update users set user_profile_color=? where user_id=?`;
    binds = [user_color, user_id];
  }
  const [data, _] = await mysql.execute(url, binds);
  return data;
};

// login
module.exports.loginQuery = async ({ source, password }) => {
  console.log(source);
  const [rows, _] = await mysql.execute(
    `select user_id,user_password from users where (user_phone=? or user_email=?) and user_auth=? and user_is_active=?`,
    [source, source, 1, 1]
  );
  console.log(rows);
  return rows;
};
