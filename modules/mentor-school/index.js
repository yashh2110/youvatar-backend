const { createSchoolService } = require("./school.service");

const mentorSchool = {
  createSchool: createSchoolService,
};

module.exports = mentorSchool;
