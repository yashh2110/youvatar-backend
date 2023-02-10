const {
  createAccountService,
  sendOtpService,
  verifyOtpService,
  checkUserNameService,
} = require("./user.service");

const user = {
  createAccount: createAccountService,
  sendOtp: sendOtpService,
  verifyOtp: verifyOtpService,
  checkUserName: checkUserNameService,
};

module.exports = user;
