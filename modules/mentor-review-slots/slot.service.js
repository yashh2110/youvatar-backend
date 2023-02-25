const { createSlotQuery } = require("./slot.dal");
const { bookSlotQuery } = require("./slot.dal");
const { getSlotQuery } = require("./slot.dal");
const { generateFixedSlotQuery } = require("./slot.dal");

module.exports.generateFixedSlotService = async (req, res) => {
  let body = req.body;
  try {
    await generateFixedSlotQuery({ ...body });
    return res.status(200).json({ msg: "Fixed slot generated successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.createSlotService = async (req, res) => {
  let body = req.body;
  try {
    await createSlotQuery({ ...body });
    return res.status(200).json({ msg: "Slot created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.bookSlotService = async (req, res) => {
  let { mentor_id, review_id } = req.body;
  console.log(mentor_id, review_id);
  try {
    await bookSlotQuery({ mentor_id, review_id });
    return res.status(200).json({ msg: "Slot booked successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || err.message || "Something went wrong" });
  }
};

module.exports.getSlotService = async (req, res) => {
  let { date } = req.params;
  try {
    console.log(date);
    const data = await getSlotQuery({ date });
    return res
      .status(200)
      .json({ msg: "Retrieved slots successfully", slots: data[0] });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || err.message || "Something went wrong" });
  }
};
