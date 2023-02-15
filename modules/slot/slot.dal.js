const mysqlConn = require("../../config/mysql.config");

const mysql = mysqlConn.promise();

module.exports.createSlotQuery = async ({ date, start_time, end_time }) => {
  // adding slots into slots table.
  const insert_slot = await mysql.execute(
    `insert into slots (start_time, end_time, is_active) values (?, ?, ?)`,
    [start_time, end_time, 1]
  );

  const slot_id = insert_slot[0].insertId;

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
    `select * from slot_review where review_id = ? and slot_is_vacant = ?`,
    [review_id, 1]
  );
  // check for mentor id
  const check_mentor = await mysql.execute(
    `select * from mentors where mentor_id = ?`,
    [mentor_id]
  );

  const review_len = check_slot[0].length;
  const mentor_len = check_mentor[0].length;

  if (review_len == 1 && mentor_len == 1) {
    // updating slot review table
    const update_review_slot = await mysql.execute(
      `update slot_review set slot_is_vacant = ? where review_id = ?`,
      [0, review_id]
    );
    // adding entry into slot booking table
    const res = await mysql.execute(
      `insert into slot_booking (review_id, mentor_id, slot_is_booked) values (?, ?, ?)`,
      [review_id, mentor_id, 1]
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
  console.log(res);
  return res;
};
