const {
  createAccountService,
  sendOtpService,
  verifyOtpService,
} = require("./user.service");

const user = {
  createAccount: createAccountService,
  sendOtp: sendOtpService,
  verifyOtp: verifyOtpService,
};

module.exports = user;
