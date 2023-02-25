const {
  createCourseLandingPage,
  addCourseOutcomes,
  addCourseRequirements,
  addCourseMessages,
  addCoursePricing,
  createModule,
  createLecture,
  getModules,
  getLectures,
  createBatch,
  addLectureResources,
} = require("./course.service");

module.exports.createCourse = {
  landingPage: createCourseLandingPage,
  outcomes: addCourseOutcomes,
  requirements: addCourseRequirements,
  messages: addCourseMessages,
  pricing: addCoursePricing,
  module: createModule,
  lecture: createLecture,
  lectureResource: addLectureResources,
  batch: createBatch,
};

module.exports.course = {
  getModules: getModules,
  getLectures: getLectures,
};
