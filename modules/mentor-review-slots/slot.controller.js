const express = require("express");
const slot = require(".");
const middleware = require("../../middleware");
const slotRoute = express.Router();

slotRoute.post("/gen_slot", middleware.validateSlot, slot.generateFixedSlot);
slotRoute.post("/create_slot", slot.createSlot);
slotRoute.post("/book_slot", slot.bookSlot);
slotRoute.get("/get_slots/:date", slot.getSlot);

module.exports = slotRoute;
