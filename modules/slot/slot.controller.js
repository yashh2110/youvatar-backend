const express = require("express");
const slot = require(".");
const middleware = require("../../middleware");
const slotRoute = express.Router();

slotRoute.post("/create_slot", middleware.validateSlot, slot.createSlot);
slotRoute.post("/book_slot", slot.bookSlot);
slotRoute.get("/get_slots", slot.getSlot);

module.exports = slotRoute;
