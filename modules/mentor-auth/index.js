const {
    createSchoolService,
} = require("./mentor.service");

const mentor = {
    createSchool: createSchoolService,
};

module.exports = mentor;
