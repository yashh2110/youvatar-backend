const express = require("express");
const mentorSchool = require("./school.service");
const schoolRoutes = express.Router();

schoolRoutes.route("/create_new_school").post(mentorSchool.createSchoolService);

module.exports = schoolRoutes;
