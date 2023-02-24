const mysqlConn = require("../../config/mysql.config");

const mysql = mysqlConn.promise();

module.exports.getCourseQuery = async ({ course_id }) => {
  const res = await mysql.execute(`select * from courses where course_id = ?`, [
    course_id,
  ]);
  return res;
};

module.exports.getCourseListQuery = async ({ searchWord }) => {
  // make case insensitive search
  const res = await mysql.execute(
    `select * from courses where course_title like CONCAT('%', ?,  '%') or course_subtitle like CONCAT('%', ?,  '%') or course_description like CONCAT('%', ?,  '%')`,
    [searchWord, searchWord, searchWord]
  );
  return res;
};

module.exports.addToCartQuery = async ({ user_id, course_id }) => {
  const res = await mysql.execute(
    `insert into user_course (user_id, course_id, has_paid) values (?, ?, 0)`,
    [user_id, course_id]
  );
  return res;
};

module.exports.removeFromCartQuery = async ({ user_id, course_id }) => {
  const res = await mysql.execute(
    `delete from user_course where user_id = ? and course_id = ? and has_paid = 0`,
    [user_id, course_id]
  );
  return res;
};

module.exports.checkoutQuery = async ({ user_id }) => {
  const res = await mysql.execute(
    `update user_course set has_paid = 1 where user_id = ?`,
    [user_id]
  );
  return res;
};
