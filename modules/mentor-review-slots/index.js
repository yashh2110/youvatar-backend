const {
  createSlotService,
  bookSlotService,
  getSlotService,
  generateFixedSlotService,
} = require("./slot.service");

const slot = {
  generateFixedSlot: generateFixedSlotService,
  createSlot: createSlotService,
  bookSlot: bookSlotService,
  getSlot: getSlotService,
};

module.exports = slot;
