const {
  createSlotService,
  bookSlotService,
  getSlotService,
} = require("./slot.service");

const slot = {
  createSlot: createSlotService,
  bookSlot: bookSlotService,
  getSlot: getSlotService,
};

module.exports = slot;
