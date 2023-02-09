const express = require("express");
const mentor = require(".");
const middleware = require("../../middleware");
const mentorRoute = express.Router();

mentorRoute.post(
  "/create_school",
  middleware.validateSchool,
  mentor.createAccount
);

module.exports = mentorRoute;
