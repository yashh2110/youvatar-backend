const mysqlConn = require("../../config/mysql.config");

const mysql = mysqlConn.promise();

module.exports.generateFixedSlotQuery = async ({ start_time, end_time }) => {
  // adding slots into slots table.
  const res = await mysql.execute(
    `insert into slots (start_time, end_time, is_active) values (?, ?, ?)`,
    [start_time, end_time, 1]
  );
  return res;
};

module.exports.createSlotQuery = async ({ slot_id, date }) => {
  // adding slot into slot review table.
  const res = await mysql.execute(
    `insert into slot_review (slot_id, date, slot_is_vacant) values (?, ?, ?)`,
    [slot_id, date, 1]
  );
  return res;
};

module.exports.bookSlotQuery = async ({ review_id, mentor_id }) => {
  // check for review id and is vacant fields
  const check_slot = await mysql.execute(
    `select count(*) as review_count from slot_review where review_id = ? and slot_is_vacant = ?`,
    [review_id, 1]
  );
  // check for mentor id
  const check_mentor = await mysql.execute(
    `select count(*) as mentor_count from mentors where mentor_id = ?`,
    [mentor_id]
  );

  const review_len = check_slot[0][0].review_count;
  const mentor_len = check_mentor[0][0].mentor_count;
  console.log(review_len);
  console.log(mentor_len);

  if (review_len == 1 && mentor_len == 1) {
    // updating slot review table
    const update_review_slot = await mysql.execute(
      `update slot_review set slot_is_vacant = ? where review_id = ?`,
      [0, review_id]
    );
    // adding entry into slot booking table
    const res = await mysql.execute(
      `insert into slot_booking (review_id, mentor_id) values (?, ?)`,
      [review_id, mentor_id]
    );
    return res;
  } else if (review_len == 0) {
    throw new Error("The given slot is already booked!");
  } else {
    throw new Error("The given review ID and mentor ID are incorrect!");
  }
};

module.exports.getSlotQuery = async ({ date }) => {
  const res = await mysql.execute(
    `select * from slots inner join slot_review on slot_review.slot_id = slots.slot_id and slot_review.date = ? and slots.is_active = 1`,
    [date]
  );
  return res;
};
