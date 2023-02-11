const express = require("express");
const school = require(".");
const middleware = require("../../middleware");
const schoolRoute = express.Router();

schoolRoute.post(
  "/create_school",
  middleware.validateSchool,
  school.createSchool
);

module.exports = schoolRoute;
