const { createSlotQuery } = require("./slot.dal");
const { bookSlotQuery } = require("./slot.dal");
const { getSlotQuery } = require("./slot.dal");

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
  let body = req.body;
  try {
    await bookSlotQuery({ ...body });
    return res.status(200).json({ msg: "Slot booked successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.getSlotService = async (req, res) => {
  let body = req.body;
  try {
    const data = await getSlotQuery({ ...body });
    return res
      .status(200)
      .json({ msg: "Retrieved slots successfully", data: data[0] });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};
