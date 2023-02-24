const {
  getCourseService,
  getCourseListService,
  addToCartService,
  removeFromCartService,
  checkoutService,
} = require("./user_course.service");

const userCourse = {
  getCourse: getCourseService,
  getCourseList: getCourseListService,
  addToCart: addToCartService,
  removeFromCart: removeFromCartService,
  checkout: checkoutService,
};

module.exports = userCourse;
