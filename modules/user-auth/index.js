const {
  createAccountService,
  sendOtpService,
  verifyOtpService,
  createUserSessionService,
  completeUserProfileService,
  loginService,
} = require("./user.service");

const user = {
  createAccount: createAccountService,
  sendOtp: sendOtpService,
  verifyOtp: verifyOtpService,
  createSession: createUserSessionService,
  completeProfile: completeUserProfileService,
  login: loginService,
};

module.exports = user;
